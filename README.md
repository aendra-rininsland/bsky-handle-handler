<!--
title: 'Bluesky Handle Resolver'
description: 'Put this on a wildcard subdomain and populate handles.tsv with Bluesky handles and DIDs to allow multiple people to set their Bluesky handle to your domain'
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/aendra-rininsland'
authorName: 'Ændra Rininsland'
authorAvatar: 'https://avatars.githubusercontent.com/u/185041?v=4'
-->

Let multiple people use your domain name for their Bluesky handles!

## Usage

Populate handles.tsv. Each line is a Bluesky handle (ending in .yourdomain.com) and a DID, separated by a tab character.
Deploy, then point a wildcard DNS record at the service, which must live at *.yourdomain.com/.well-known/atproto-did

### Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying bsky-handle-handler to stage dev (us-east-1)

✔ Service deployed to stack bsky-handle-handler (152s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  api: bsky-handle-handler-dev-api (1.9 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/.well-known/atproto-did
```

Which should result in response similar to the following (removed `input` content for brevity):

```
did:plc:...
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function hello
```

Which should result in response similar to the following:

```
did:plc:...
```


Alternatively, it is also possible to emulate API Gateway and Lambda locally by using `serverless-offline` plugin. In order to do that, execute the following command:

```bash
serverless plugin install -n serverless-offline
```

It will add the `serverless-offline` plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`.

After installation, you can start local emulation with:

```
serverless offline
```

To learn more about the capabilities of `serverless-offline`, please refer to its [GitHub repository](https://github.com/dherault/serverless-offline).
