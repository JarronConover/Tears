from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt

from .models import Bracket


# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def me(req):
    return JsonResponse({'user': model_to_dict(req.user)})

@login_required
def personal(req):
    return JsonResponse({'brackets': model_to_dict(req.user)})

@csrf_exempt
def create_bracket(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            
            bracket = Bracket(
                name=data.get("name"),
                description=data.get("description"),
                num_items=data.get("numItems"),
                items=data.get("items"), 
                creator=data.get("username"),  
                first_name=data.get("user"),  
            )
            bracket.save()
            return JsonResponse({"message": "Bracket created successfully", "id": bracket.id}, status=201)
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method."}, status=405)

@login_required
def get_brackets(request):
    if request.method == "GET":
        brackets = Bracket.objects.all().values()
        return JsonResponse(list(brackets), safe=False)
    
@login_required
@csrf_exempt 
def fill_bracket(request, id):
    try:
        bracket = Bracket.objects.get(id=id)

        if request.method == "GET":
            # Return bracket data as before for GET request
            return JsonResponse({
                'id': bracket.id,
                'name': bracket.name,
                'description': bracket.description,
                'num_items': bracket.num_items,
                'items': bracket.items,
                'creator': bracket.creator,
                'first_name': bracket.first_name,
                'winner': bracket.winner,
            })

        elif request.method == "PATCH":
            # Handle the PATCH request to update the winner
            if request.content_type == "application/json":
                try:
                    # Get the winner from the request body
                    data = json.loads(request.body)
                    winner = data.get('winner')

                    if winner is not None:
                        bracket.winner = winner
                        bracket.save()

                        # Return the updated bracket data
                        return JsonResponse({
                            'id': bracket.id,
                            'name': bracket.name,
                            'winner': bracket.winner,
                        })
                    else:
                        return JsonResponse({'error': 'Winner not provided'}, status=400)

                except ValueError:
                    return JsonResponse({'error': 'Invalid JSON data'}, status=400)
            else:
                return JsonResponse({'error': 'Invalid content type'}, status=400)

    except Bracket.DoesNotExist:
        return JsonResponse({'error': 'Bracket not found'}, status=404)