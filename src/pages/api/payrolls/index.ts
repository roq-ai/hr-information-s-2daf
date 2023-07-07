import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { payrollValidationSchema } from 'validationSchema/payrolls';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPayrolls();
    case 'POST':
      return createPayroll();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPayrolls() {
    const data = await prisma.payroll
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'payroll'));
    return res.status(200).json(data);
  }

  async function createPayroll() {
    await payrollValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.payroll.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
