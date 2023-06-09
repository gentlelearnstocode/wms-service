import { IQuery } from '../../interfaces/query.interfaces';
import { PipelineStage } from 'mongoose';

export const buildAggregationPipelines = (query: IQuery) => {
  const pipelines = [] as PipelineStage[];
  const { offset, limit } = query;
  pipelines.push({ $skip: Number(offset) || 0 });
  pipelines.push({ $limit: Number(limit) || 100 });
  return pipelines;
};
