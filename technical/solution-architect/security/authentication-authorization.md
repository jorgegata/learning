# Authentication and Authorization

## Data Dictionary

### What is a Token? And a JWT Token?

A token is a temporal string or data that proofs of something. The idea is that you login once, get a token, and then send that token with subsequent requests.
Usually contains: who you are, who issued, when issued, when expiring, what you are allowed (permission/scope), random signature to prevent tampering.

JWT is JSON Web Token, and it is basically a three base64-encoded JSON part separated by dots containing header (algorithm type), payload (actual data/claims), signature (prove it was not tampered). The flow is then:

1. You authenticate -> server creates token -> send it back to you
2. You include in every request your token in the **Authorization: Bearer**
3. Server validates token -> knows who you are
4. Token expires (refresh token flow or login again)

It is stateless, scalable, api friendly, microservices friendly, cross-domain. In real world, you get the token, validate them, and read the claims (then move on).

### What is OAuth2.0 / OpenID connect

OAuth2.0 is an authorization not authentication service. It basically says *How do I let App A access my data in App B without giving App A my password*

*Example*: you have an app that want to post on Twitter. Instead of giving your twitter password to the app, twitter asks "do you wnat to let this app post tweets?" You say yes, twitter gives the app a token that only lets it post tweets, but benever send the password. **It is considered a delegated authorization**. 

OIDC is a authentication built on top of OAuth2.0. The last says I can do X,Y,Z action, and OIDC adds an ID token that says "I am user ABC with email a@gmail.com"

- "Login with Google/GitHub..." - OIDC using an IdP
- "Connect to Google Calendar..." - OAuth2.0, the app need to access files but does not care about identity.

### What is a Identity Provider?

Service that stores and manages user identities and handles the authentication for you. Instead of the app managing its own user database and login flow, you externalize this into a service.

They handle: store credentials, multi-factor authentication, account recovery, user profile data, actual login UI/flow, token issuance (providing and refreshing).

1. **Employees:** Azure AD for internal tools
2. **Customers:** Auth0 or Clerk for your product
3. **Social Login:** Google/Github/Apple as secondary options...

**Keep simplicity** so do not build your own IdP unless you're literally building an auth company. The amount of edge cases, security concerns, compliance requirements... it is insane. Pick one that fits your use case and move on.

## Authentication and Authorization Definition

Authentication is proving who you are, so identifying the identity. When you enter a password into SSH, scan your fingerprint, or enter a 2FA code, that's authentication. It is binary, so basically stating if you are the person or not. Usually this happends when you validate credentials against a user database

Authorization is what you are allowed to do once you are authenticated. **It's about permissions and access control**. This usually happends when you check ACLs, role permissions, or policy rules... 

### How many credentials do we have?

1. Knowledge-based (something you know): something you know (password, passphrase, pin)
2. Posession-based (something you have): api key/token, certificates (X.509/TLS), hardware tokens, software token
3. Biometrics (something you are): fingerprint, face, iris scan...
4. Cryptographic Credentials: ssh keys, gpg keys...
5. Modern/Combined credentials
6. Enterprise/Special purpose

What is a multiple factor? The combination of 2 or more factors mentioned above (something you know (password) + something you have (phone) )

Among all, passkeys are the future as they are SSH keys for the web but with better UX. Credentials are just proof of identity.
The best credential is one that's:
* hard to steal
* easy to use
* unique per service.

## Authorization Layers (Azure)

1. Simple way - Check group membership in the JWT claims
2. App Roles - roles defined in App Registration, and these show up as claims in the token.
3. Azure RBAC - For Azure Resources, you can gave built-in roles like Contributor, Reader, Owner... so you can control who deploy, modify Azure Resources...
4. Application-level - token says who you are and the Azure groups/roles, buy you map that to your app's permissions. **Store in database or use something like Casbin**



