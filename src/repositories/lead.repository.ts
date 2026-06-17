import prisma from "../config/prisma";

export class LeadRepository {
  static async create(data: any) {
    return prisma.lead.create({
      data,
    });
  }

  static async findById(id: number) {
    return prisma.lead.findUnique({
      where: { id },
    });
  }
static async findAll(query: any) {

  const page =
    Number(query.page) || 1;

  const limit =
    Number(query.limit) || 10;

  const skip =
    (page - 1) * limit;

  const where: any = {};

  if (query.source) {
    where.source = query.source;
  }

  if (
    query.minScore ||
    query.maxScore
  ) {
    where.score = {
      gte: Number(query.minScore || 0),
      lte: Number(query.maxScore || 100),
    };
  }

  return prisma.lead.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      score:
        query.sort === "asc"
          ? "asc"
          : "desc",
    },
  });
}

  static async update(
    id: number,
    data: any
  ) {
    return prisma.lead.update({
      where: { id },
      data,
    });
  }
  static async getStats() {

  const totalLeads =
    await prisma.lead.count();

  const avgScore =
    await prisma.lead.aggregate({
      _avg: {
        score: true
      }
    });

  return {
    totalLeads,
    averageScore:
      avgScore._avg.score || 0
  };
}

  static async delete(id: number) {
    return prisma.lead.delete({
      where: { id },
    });
  }
}

