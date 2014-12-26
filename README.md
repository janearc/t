t
===
t is a toy language jane is making for herself. let's look at the hello world
example provided:

```
ok, then shift stack into this
	and print it

ok, end
	ended is true
		and push "hello" into stack
		and push "world" into stack
	ended isnt true
		and static ended is true

bye
```

The very first line starts with `ok,` which indicates a directive to the
interpeter that a statement is beginning. You are saying "do the things I tell
you from this point forward." The word `then` indicates a statement or
directive follows but is basically thrown away by the interpreter.

So the first statement is `ok,`, followed by the directive, `shift stack into this`,
which is comprised of the reserved word, `shift`, meaning "take the first
element off a list", with the argument, `stack`, which is a reserved word,
referring to the global T stack. The target of `shift stack` is specified with
the word `into`, and the word `this` is used to refer to the "default
variable", which is a concept borrowed from perl, which uses `$_`, `@_`, and so
on.

The whitespace following the first line, indenting into `and` is optional; it
aids readability, but that's it. The important directive is `and`. The
interpreter will continue to read and evaluate directives until it sees a
statement that is declarative; that is, until it encounters a conditional or an
assignment, it will all be read as one statement, and have one scope, one
`this`, and so on. In this case, `and` says that `this` is the *default
variable* from the previous line, and the word `it` is syntactic sugar,
referring only to `this`.

The directive is `print it`, meaning "print 'this' from the `shift stack`
statement." `print` is a builtin, doing what you would expect.

The first clause effectively then says "print everything in the stack." 

The second clause is the specific `ok, end` clause. This is invoked at the end
of the program.
