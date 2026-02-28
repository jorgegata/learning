# Unit anatomy (AAAC)

The unit anatomy is the different parts of a unit test when executed generally. It involves these steps:

1. Arrange (data or context management)
2. Act (transformatinos needed or callings)
3. Assert (comparison)
4. Cleanup (diconnect or garbage removal)

As its core, the test is basically and **Act** and **Assert** part, with the **Arrange** only providing potential context.

## Arrange

Preparing everything needed for the act to do the action in one. Let's say you put the test in a state context (one change in state at a time).

It can mean prepare objects, start/kill services, enter records in a database, defining an URL to query, generating credentials for a user that does not exist...

## Act

Singular, state-change or value-change action that kicks off the **behaviour** we want to test. The resulted change of state is what we can look to make a judgement about the behaviour. Usually, this takes the form of a function/method calling

## Assert

This is what we look at the resulting state and check if it looks how we'd expect after the dust has settled. This is where we gather evidence if it matches our real truth.

## Cleanup

Part where the test is picked up itself, so other test do not influence this one.


