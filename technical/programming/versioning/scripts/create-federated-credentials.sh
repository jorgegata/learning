#!/bin/bash
# Script to create federated credentials for GitHub Actions
# Check if APP_ID is provided
if [ -z "$APP_ID" ]; then
  echo "Error: APP_ID environment variable is not set"
  echo "Usage: APP_ID=your_app_id ./create-federated-credentials.sh"
  exit 1
fi
# Set variables
GITHUB_ORG="Sika-SUS"
GITHUB_REPO="sp_epd_automation"
ENVIRONMENTS=("dev" "qa" "prod")
echo "Creating federated credentials for App ID: $APP_ID"
echo "GitHub Organization: $GITHUB_ORG"
echo "GitHub Repository: $GITHUB_REPO"
# Create federated credentials for each environment
for ENV in "${ENVIRONMENTS[@]}"; do
  # Branch-based credential
  echo "Creating branch-based federated credential for $ENV"
  az ad app federated-credential create \
    --id $APP_ID \
    --parameters "{
      \"name\": \"github-${ENV}-federated-cred\",
      \"issuer\": \"https://token.actions.githubusercontent.com\",
      \"subject\": \"repo:${GITHUB_ORG}/${GITHUB_REPO}:ref:refs/heads/${ENV}\",
      \"description\": \"Federated credential for GitHub Actions from ${ENV} branch\",
      \"audiences\": [\"api://AzureADTokenExchange\"]
    }"
  # Environment-based credential
  echo "Creating environment-based federated credential for $ENV"
  az ad app federated-credential create \
    --id $APP_ID \
    --parameters "{
      \"name\": \"github-${ENV}-env-federated-cred\",
      \"issuer\": \"https://token.actions.githubusercontent.com\",
      \"subject\": \"repo:${GITHUB_ORG}/${GITHUB_REPO}:environment:${ENV}\",
      \"description\": \"Federated credential for GitHub Actions to ${ENV} environment\",
      \"audiences\": [\"api://AzureADTokenExchange\"]
    }"
done
echo "All federated credentials created successfully!"