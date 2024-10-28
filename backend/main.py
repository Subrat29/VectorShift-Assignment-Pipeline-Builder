from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.pipeline import router as pipeline_router
from pydantic import BaseModel

class PipelineData(BaseModel):
    nodes: list
    edges: list

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pipeline_router)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: PipelineData):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag = True
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}
