from fastapi import APIRouter
from pydantic import BaseModel
from utils.graph import check_dag

router = APIRouter()

class PipelineData(BaseModel):
    nodes: list
    edges: list

@router.post("/parse")
async def parse_pipeline(pipeline: PipelineData):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag = check_dag(pipeline.edges)
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}
