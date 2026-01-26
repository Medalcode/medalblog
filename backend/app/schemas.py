from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional

class UserWeights(BaseModel):
    # e.g. {"Escalabilidad": 0.9, "Facilidad": 0.5}
    weights: Dict[str, float]
    proyecto: Optional[str] = None

class RecommendationItem(BaseModel):
    name: str
    category: Optional[str]
    final_score: float
    justification: Optional[str] = None
    team_suggestion: Optional[List[Dict[str, Any]]] = None

class RecommendationResponse(BaseModel):
    recommendations: List[RecommendationItem]
