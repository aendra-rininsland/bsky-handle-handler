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

# bsky-handle-handler

Allow multiple people use your domain name for their Bluesky handles! :sparkles:

## Usage

Populate handles.tsv. Each line is a Bluesky handle (ending in .yourdomain.com) and a DID, separated by a tab character.
Deploy, then point a wildcard DNS record at the service, which must live at `*.yourdomain.com/.well-known/atproto-did`

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

*Note:* This doesn't do anything with DNS! You need to set up Amazon Route53 or similar
in conjunction with API Gateway to ensure `*.yourdomain.com` resolves to `*.yourdomain.com/.well-known/atproto-did`.

Also, if you host a lot of handles, you'll want to put some kind of caching in front of the Lambda so you don't
pay for every time it gets invoked!

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/.well-known/atproto-did
```

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


### Roadmap (I probably won't do any of these, please feel free to fork!)
- Automate Route53 record creation/API Gateway configuration
- More sophisticated record management
- Built-in caching, possibly using CloudFront