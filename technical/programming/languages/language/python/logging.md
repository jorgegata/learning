# Logging

Logs is a good way to track down operations or events inside the code. Usually, it is done for:

* Errors (unexpected ones, not assertion ones) -> logger.error()
* Performance metrics: time.time() - time.time()[future] asssert difference > 1.0, "slow operation, took {time.time() - time.time()} s" -> logger.warning()
* External system faiilures (that you retry) -> logger.error()
* Money/critical operations (audit trail) -> lawyers might ask for, with logger.info()
* Startup/Shutdown (system state changes) -> logger.info()

The most important ones are **ERROR** and **AUDIT (info)**. Warnings, info, and debug by order are irrelevant most of cases.

