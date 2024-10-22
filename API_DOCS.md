# Project: EzyMetrics

# 📁 Collection: Leads

## End-point: getLeads

### Method: GET

Get existing leads from the dummy CRM.

> ```
> http://localhost:3001/api/v1/leads
> ```

## End-point: addLeads

### Method: POST

Add leads from dummy CRM to the database.

> ```
> http://localhost:3001/api/v1/leads
> ```

## End-point: deleteLeads

### Method: DELETE

Delete leads from the database.

> ```
> http://localhost:3001/api/v1/leads
> ```

# 📁 Collection: Campaigns

## End-point: getCampaigns

### Method: GET

Get existing campaigns from the dummy CRM.

> ```
> http://localhost:3001/api/v1/campaigns
> ```

## End-point: addCampaigns

### Method: POST

Add campaigns from dummy CRM to the database.

> ```
> http://localhost:3001/api/v1/campaigns
> ```

## End-point: deleteCampaigns

### Method: DELETE

Delete campaigns from the database.

> ```
> http://localhost:3001/api/v1/campaigns
> ```

# 📁 Collection: Metrics

## End-point: getMetrics

### Method: GET

Get metrics from the database.

> ```
> http://localhost:3001/api/v1/metrics
> ```

## End-point: addMetrics

### Method: POST

Add metrics to the database.

> ```
> http://localhost:3001/api/v1/metrics
> ```

# 📁 Collection: Reports

## End-point: getLeadsReports

### Method: POST

Generate 'CSV' or 'PDF' reports for leads.

> ```
> http://localhost:3001/api/v1/reports/leads
> ```

### Body (**raw**)

```json
{
    "name": "", // your name
    "email": "" // valid email
}
```

### Query Params

| Param | value                             |
| ----- | --------------------------------- |
| type  | 'pdf' or 'csv' (Defaults to: csv) |

## End-point: getCampaignsReports

### Method: POST

Generate 'CSV' or 'PDF' reports for campaigns.

> ```
> http://localhost:3001/api/v1/reports/campaigns
> ```

### Body (**raw**)

```json
{
    "name": "", // your name
    "email": "" // valid email
}
```

### Query Params

| Param | value                             |
| ----- | --------------------------------- |
| type  | 'pdf' or 'csv' (Defaults to: csv) |

## End-point: getMetricsReports

### Method: POST

Generate 'CSV' or 'PDF' reports for metrics.

> ```
> http://localhost:3001/api/v1/reports/metrics?type=pdf
> ```

### Body (**raw**)

```json
{
    "name": "", // your name
    "email": "" // valid email
}
```

### Query Params

| Param | value                             |
| ----- | --------------------------------- |
| type  | 'pdf' or 'csv' (Defaults to: csv) |
