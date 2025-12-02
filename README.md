# microservice-app
#HPA Setup################
1️⃣ Make sure metrics-server is installed

HPA relies on Kubernetes metrics. Check if it’s running:

kubectl get deployment metrics-server -n kube-system


If it’s not installed, install it:

kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml


Then verify:

kubectl get deployment metrics-server -n kube-system

kubectl apply -f hpa.yaml
You can now exec into your frontend container and run stress, e.g.:

kubectl exec -it <frontend-pod> -- stress --cpu 2 --timeout 60
==============================================
