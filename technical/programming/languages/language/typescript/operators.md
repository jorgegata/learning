#

Operators are important for conditional, arithmetics, and other operations inside typescript

- &&: use to do lazy evaluation, basically if left side is true, then execute right side (if true, use this)
- ||: use this or fallback (name || 'Guest')
- ? : if-else (isAdmin ? <A /> : <B />)
- ?? : use this or default (only if null or undefined) (count ?? 0)
- ?. : safe access (user?.name)
- ! : not (!isLoading && <Content />)