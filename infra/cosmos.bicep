// Cosmos DB module for smart sportswear application
// Handles user profiles, device data, and analytics with global distribution

@minLength(3)
@maxLength(44)
@description('Name of the Cosmos DB account')
param cosmosAccountName string

@minLength(1)
@description('Primary location for the Cosmos DB account')
param location string = resourceGroup().location

@description('User-assigned managed identity for Cosmos DB access')
param userAssignedIdentityId string

@description('Principal ID of the user-assigned managed identity')
param userAssignedIdentityPrincipalId string

// Cosmos DB Account with NoSQL API for flexibility
resource cosmosAccount 'Microsoft.DocumentDB/databaseAccounts@2024-05-15' = {
  name: cosmosAccountName
  location: location
  kind: 'GlobalDocumentDB'
  properties: {
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session' // Good balance for user data and real-time device data
    }
    locations: [
      {
        locationName: location
        failoverPriority: 0
        isZoneRedundant: false
      }
    ]
    databaseAccountOfferType: 'Standard'
    enableAutomaticFailover: false
    enableMultipleWriteLocations: false
    // Security: Disable key-based access, use RBAC only
    disableKeyBasedMetadataWriteAccess: true
    disableLocalAuth: true
    publicNetworkAccess: 'Enabled'
    capabilities: [
      {
        name: 'EnableServerless' // Cost-effective for startup phase
      }
    ]
  }
}

// Database for smart sportswear data
resource database 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2024-05-15' = {
  parent: cosmosAccount
  name: 'SportswearDB'
  properties: {
    resource: {
      id: 'SportswearDB'
    }
  }
}

// Container for user profiles
resource userProfilesContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2024-05-15' = {
  parent: database
  name: 'UserProfiles'
  properties: {
    resource: {
      id: 'UserProfiles'
      partitionKey: {
        paths: ['/userId']
        kind: 'Hash'
      }
      indexingPolicy: {
        automatic: true
        includedPaths: [
          {
            path: '/*'
          }
        ]
      }
    }
  }
}

// Container for device sensor data
resource deviceDataContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2024-05-15' = {
  parent: database
  name: 'DeviceData'
  properties: {
    resource: {
      id: 'DeviceData'
      partitionKey: {
        paths: ['/deviceId']
        kind: 'Hash'
      }
      indexingPolicy: {
        automatic: true
        includedPaths: [
          {
            path: '/*'
          }
        ]
        excludedPaths: [
          {
            path: '/sensorReadings/?' // Exclude high-volume sensor data from indexing
          }
        ]
      }
      defaultTtl: 2592000 // 30 days TTL for device data
    }
  }
}

// Container for analytics and aggregated data
resource analyticsContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2024-05-15' = {
  parent: database
  name: 'Analytics'
  properties: {
    resource: {
      id: 'Analytics'
      partitionKey: {
        paths: ['/aggregationType']
        kind: 'Hash'
      }
      indexingPolicy: {
        automatic: true
        includedPaths: [
          {
            path: '/*'
          }
        ]
      }
    }
  }
}

// RBAC: Cosmos DB Data Contributor role for the container app
resource cosmosDataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(cosmosAccount.id, userAssignedIdentityId, 'b24988ac-6180-42a0-ab88-20f7382dd24c')
  scope: cosmosAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'b24988ac-6180-42a0-ab88-20f7382dd24c')
    principalId: userAssignedIdentityPrincipalId
    principalType: 'ServicePrincipal'
  }
}

// Outputs
output cosmosAccountName string = cosmosAccount.name
output cosmosEndpoint string = cosmosAccount.properties.documentEndpoint
output cosmosDatabaseName string = database.name
output cosmosAccountId string = cosmosAccount.id
