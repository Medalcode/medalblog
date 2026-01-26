import os
import requests
from typing import Dict

OLLAMA_URL = os.getenv('OLLAMA_URL')  # e.g. http://localhost:11434/v1/generate

def _build_prompt(user_input: Dict, top_stack: Dict) -> str:
    proyecto = user_input.get('proyecto', 'un proyecto')
    prioridades = user_input.get('weights', {})
    prompt = (
        f"Actúa como un Arquitecto Senior. El usuario quiere construir: {proyecto}. "
        f"Prioridades: {prioridades}.\n\n"
        f"El motor lógico ha determinado que el mejor stack es: {top_stack['name']}. "
        "Justifica en 3 puntos clave por qué este stack es el ideal para este caso específico, "
        "mencionando un trade-off que el usuario deba considerar. Responde en español técnico y claro."
    )
    return prompt

def generate_justification(user_input: Dict, top_stack: Dict) -> str:
    prompt = _build_prompt(user_input, top_stack)

    if OLLAMA_URL:
        try:
            r = requests.post(OLLAMA_URL, json={"prompt": prompt}, timeout=10)
            r.raise_for_status()
            data = r.json()
            # Expect provider to return {'text': '...'} or similar
            return data.get('text') or data.get('output') or str(data)
        except Exception:
            # fallback to local template
            pass

    # Fallback (deterministic, safe)
    justification = (
        f"1) Rapidez de entrega: {top_stack['name']} permite iterar rápidamente y aprovechar ecosistemas maduros.\n"
        f"2) Ecosistema y librerías: ofrece amplia disponibilidad de paquetes y soporte.\n"
        f"3) Comunidad y contratación: fácil encontrar talento para mantener el producto.\n"
        f"Trade-off: Puede sacrificar rendimiento absoluto en tareas CPU-intensivas frente a alternativas más especializadas."
    )
    return justification
