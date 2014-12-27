T
===
T is a toy language jane is making for herself. let's look at the hello world
example provided:

```
ok, then shift stack into this
	and print it

ok, end
	ended isnt true
		and push "hello" into stack
		and push "world" into stack
	ended isnt defined
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

By specifying `ok, end`, we are stating that the following block of code is to
be run at the end of the program, during 'clean up'. The first statement we see
is `ended isnt true`, comprised of `ended`, which is a bareword and ignored by
the interpreter unless it is defined in the heap (implicitly: *barewords result
in heap lookups*, which can be expensive if your heap is large). The `isnt`
"operator" is equivalency, and `true` is what you would expect. Something that
is `true` must be both defined (it exists in the heap) and its mathematical value
must be non-zero. This is to say that values `-1`, `0`, and undefined values
are false, `1`, `.023`, and `yes` are true.

Accordingly, `ended isnt true` looks for a value in the heap called `ended`,
and whether that value is truthy. Since `ended` is not actually defined, it is
a falsey value, making the statement `ended isnt true` *true*, and the interpereter
seeks forward until the next declarative. In this case, the following print
statements fire, and the interpeter seeks forward until a statement without an
`and`, which is either a declarative or a test.

The next statement we see is `ended isnt defined`. In this case, `defined` is a
specific test meaning what it sounds like. A word defined in the heap or stack
can be defined but zero (so `0` is `defined` but also `false`). In any case,
since `ended` is undefined, the subsequent `and ...` statment executes. The
next line is `and static ended is true`. This is an assignment. By using
the operator `is` with `static`, `is` becomes an assignment, and `static` (vs
`local` or `heap`) tells us what sort of variable should be assigned. The
bareword supplied is `ended`, and the value supplied is `true`. T is
loosely-typed, so while this is true in the "truthy" sense of the word, if you
were to print it, it would be "coerced" into the string `"true"`. Because we
have used the `static` flavor of assignment, the bareword `ended` will now be
visible outside the scope of `ok, end`.

The statement ends after the assignment, as there are no subsequent `and`
directives.

The next directive is `bye`. This directive tells the interpeter to clean up
and exit if the stack is empty. In the case of this program, however, the `bye`
"clean-up" process pushes two values into the global T stack, `"hello"` and
`"world"`, and accordingly, `bye` "spins" the interpereter again.

This time around, we get to the first clause, `ok, then shift stack into this`,
and we discover that the stack has two items in it, which are subsequently
printed.

The second time through the `ok, end` block, we notice that because `ended` is
in fact truthy, the two `push` statements are not executed. Because they are
not executed, and the stack is empty when `bye` is encountered, causing the
interpeter to clean up and exit.
