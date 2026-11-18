# A mail merge seats the template for every customer

**Status: Decided 2026-11-19, Executed 2026-11-19.** Built in the CLI ([`3b1dda2`](https://codeberg.org/BelType/cli/src/commit/3b1dda2f27f235df6ea007dc89b076459a719e9f/CHANGELOG.md)) and, for ruling 3, in Caster (the commit named below); on both main branches, **not released** on that day: the race in the testbench that stands before a release had not been run. Egildo's ruling of the day: asked which road is the mail merge's default, with the numbers and the two faults below before him, he answered "Seated". The round that brought it was his own ask of 2026-11-17, about the mail merge that sends each customer as data to a kept page (`POST /templates/<id>/print` in `@beltype/cli`'s `beltype serve`): "we should also make sure this is not greatly unsafe in production and browser starts mixing customer or worse breaking the tables", with a proposal of his own beside it, "making sure we destroy object and DOM before reimporting the template".

## Context

`beltype serve` keeps one page for a template's customers. Since 2026-11-07 a customer after the first found the page of the customer before, and only the top-level boxes that changed were replaced, through Cicero's patch door, and the cut resumed from the first of them ([the run resumes from an entry](../cicero/the-run-resumes-from-an-entry.md)). Where a customer changed the shape of the body, or Cicero would not promise the patch, the template was written anew as the page's document. Nothing checked at print time that the page printed was the page the data asked for: the guard was one test on a handful of customers.

The round made the road an option of the server, `--merge-road`, with three values, built the same night as a soak that sets them against each other (the CLI at [`7b303dc`](https://codeberg.org/BelType/cli/src/commit/7b303dc54361848a466ba0eb2c342d9a748df68c/CHANGELOG.md)):

- `kept`: the page of the customer before, only the changed top-level boxes replaced. The road as it was.
- `seated`: the same page, the template written anew as its document for every customer. The `Window` stays, and with it the modules, the faces and the warm writer.
- `fresh`: a page of the customer's own, closed after. Nothing is carried.

**What the soak found**, 2026-11-18, on the bill specimen with 300 seeded customers of 0 to 120 rows, each printed on the three roads and set byte for byte against the same customer on a page of their own, then under load with three workers, a folder print of another document every 25 bills and a browser restart every 100:

- No customer's words stood in another's bill, on any road.
- On the kept road 15 bills of 300 one at a time, and 23 of 600 under load, lacked one page's running head and foot, the folio among them. Cicero had kept that page from the customer before; Caster makes a margin's text into elements of its own at print time, on the ground that the print frame is discarded, and the engine parks a light child it did not make. Caster now takes back what it writes into the pages after the print (Caster at [`be4dd04`](https://codeberg.org/BelType/caster/src/commit/be4dd0448dbaecb4c7dfbc68dadc8470e89527f0/CHANGELOG.md)), and with that the soak is clean: 900 bills one at a time and 3 600 under load, none differing.
- A second fault of the kept road is not fixed. A box no customer changes is not made again, so what Caster's reification wrote into it after the cut stays: a line reading a page number with `target-counter()` printed "at page 1" on a bill of five pages whose own page says 5. The bill specimen has no such line, which is why the soak did not meet it; a test made for it did.
- `seated` and `fresh` never differed from the page of the customer's own, and print that page number right.

**What the roads cost**, the same night on a Mac with ten cores, the machine quiet, forme, the fixed Caster, 150 customers with the roads in a rotating order for each: one at a time, median milliseconds a bill at the client, `kept` 279, `seated` 326, `fresh` 654; with three workers and three clients, each road twice in a mirrored order, bills a minute, `kept` 575 and 581, `seated` 490 and 471, `fresh` 224 and 219.

## Decision

1. **The default road is `seated`.** Every customer of a mail merge finds the template written anew as the page's document, which is what he proposed before any of this was measured. The claim that nothing of the customer before is left then rests on a document written over the last one, not on the merge telling which boxes changed, on Cicero's patch door, and on Caster leaving the pages as it found them.
2. **`kept` and `fresh` stay, as options a host asks for.** `kept` is 47 ms a bill cheaper and carries the limit written beside it: a template that reads a page number or a counter outside the boxes its data changes prints the customer before's. `fresh` costs twice `seated` and is the road for a host that wants nothing shared.
3. **Caster takes back what it writes into the pages**, whatever the road: a print leaves the presented pages as the engine presented them.

Refused: keeping `kept` as the default now that its first fault is fixed. It is the faster road by a sixth, and the second fault is of a kind, not a case: anything the printer or the engine freezes into a box the merge does not replace is the customer before's, and the merge cannot see it, because it compares the template's boxes and not the page's.

## Consequences

- A host that measured the server on the kept road sees a bill cost about 47 ms more, a sixth, and under load about a sixth fewer bills a minute. `--merge-road kept` gives the old time back, with the limit.
- The kept road's second fault has no round. It would take Caster undoing its second reification after a print, or the merge replacing every box that reads a delivered value. Neither is built, and neither is owed while the default does not take that road.
- The guard proposed beside the round, a check at print time that the live boxes equal the fresh merge, is not built: under `seated` the page is the fresh merge, and under `kept` it would not see what the printer froze.
- **Not measured:** the roads in the testbench. The numbers above are the CLI's own soak on the Mac, outside Docker.
