# User Interface / User Experience + Permissions

Goal -> to render different page view depending on the user permission provided in every request.

## How?

1. User request: with Azure EasyAuth headers
2. Server Component: parse user from headers, **fetch permission from database**, conditionally render the UI.
3. Receive the permission as prop, **shows/hides interactive UI**.
4. Server Action (on button click): re-validate permissions, executes mutation.

This is done through a 3-layer permission system, meaning:

1. **Server Components** - check permission and conditionally render static part
2. **Client Component** - receive the permission as a prop (userPerms) and show/hide UI elements dynamically
3. **Server Action** - re-validate permission on every mutation (security enforcement)

It is a combination of User Experience (showing relevant UI) and security (preventing unauthorized actions) are handle properly.

Set up in `lib/utils/auth.js` and `lib/utils/client-permission.ts`

## Authorization Layer


## Client Permission

Usually permission is composed of two attributes: an array of permissions (string), and a isAdmin property (if it's admin, it bypasses all permission checks)

- hasPermission() -> if it has one specific permission 
- hasAnyPermission() -> at least one in the list
- hasAllPermission() -> if it contains all the permissions

When would you show a Button in the UI: 

```typescript
{canEdit && <Button>Edit</Button>}

```

Can it be in the server-side? Yes, but you need interactivity. It is more of do not show something that cannot be used by the user. It is not **for security, but for User Experience**

NextJS middlware, so if a specific environment variable is one, you get mock or not. So specific information (to get clode). So this is for auth-mock and auth.

All get (consumer, or someone internal) needs to know if user ir real or not.

Those are components, and those are utils components

Static export (getStaticProps and getStaticApps) - so you can expose a staticAssest,

If you instead API, worst-case scenario. Instead of calling this trough NextJS, you would only call it from other API endpoint. The migration between static and dynamic.

Purely a server-side render implementation, which means you only need to run NextJS to start the website.

