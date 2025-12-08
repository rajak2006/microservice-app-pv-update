#!/bin/bash

# Step 1: Get your public IP
YOUR_PUBLIC_IP=$(curl -s https://checkip.amazonaws.com)/32
echo "Your public IP is $YOUR_PUBLIC_IP"

# Step 2: Get the Istio Ingress Gateway Service Name in istio-system
ISTIO_INGRESS_SVC=$(kubectl get svc -n istio-system istio-ingressgateway -o jsonpath='{.metadata.name}')
echo "Istio Ingress Service: $ISTIO_INGRESS_SVC"

# Step 3: Get the NLB Security Group ID
ISTIO_INGRESS_SG=$(aws elbv2 describe-load-balancers \
    --names $ISTIO_INGRESS_SVC \
    --query "LoadBalancers[0].SecurityGroups" \
    --output text)
echo "Istio Ingress Security Group: $ISTIO_INGRESS_SG"

# Step 4: Open HTTP (port 80)
aws ec2 authorize-security-group-ingress \
    --group-id $ISTIO_INGRESS_SG \
    --protocol tcp \
    --port 80 \
    --cidr $YOUR_PUBLIC_IP
echo "Opened HTTP port 80 for $YOUR_PUBLIC_IP"

# Step 5: Open HTTPS (port 443)
aws ec2 authorize-security-group-ingress \
    --group-id $ISTIO_INGRESS_SG \
    --protocol tcp \
    --port 443 \
    --cidr $YOUR_PUBLIC_IP
echo "Opened HTTPS port 443 for $YOUR_PUBLIC_IP"

echo "✅ All done! Only your IP can access dashboards via Istio Ingress NLB."
