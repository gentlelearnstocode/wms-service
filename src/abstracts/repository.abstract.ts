import { PipelineStage } from 'mongoose';
import { IWarehouseQuery } from '../interfaces/query.interfaces';

export abstract class RepositoryAbstract {
  protected buildAggregationPipelines(query: IWarehouseQuery) {
    const pipelines = [] as PipelineStage[];
    const { offset, limit } = query;
    pipelines.push({ $skip: Number(offset) || 0 });
    pipelines.push({ $limit: Number(limit) || 100 });
    return pipelines;
  }

  protected buildLookupPipeline(from: string, localField: string, foreignField: string, as: string) {
    return {
      '$lookup': {
        from,
        localField,
        foreignField,
        as,
      },
    };
  }
}
