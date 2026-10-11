# Question updates

For every new or edited **컴퓨터 일반** question, always review its textbook page reference.
The reference textbook is the user-uploaded 28-page `컴퓨터활용능력_2급_1과목_핵심_노트.pdf`.
The uploaded source is available locally at
`/workspace/attachments/f8c568ca-cd38-4b94-acbd-ed700d2fca83/컴퓨터활용능력_2급_1과목_핵심_노트.pdf`.
`data/textbook-references.js` contains reviewed references and the PDF page headings.
Page numbers include the cover (PDF page 1). Display page numbers as plain text only;
do not add textbook links or publish the PDF. Do not show these references for spreadsheet questions.

Before publishing questions, add a reviewed entry keyed by the stable question ID:
`{pages: [24], status: "matched"}` or `{pages: [], status: "not-covered"}`.
Confirm the tested concept is actually in the reference pages. Do not match distractor
keywords or infer that a page covers a concept just because it shares a broad topic.
If the PDF is unavailable and the concept cannot be confirmed using reviewed duplicate
questions, leave the automatic `pending` status visible and report that limitation.
`scripts/textbook-reference.js` handles future questions conservatively; suggestions
must not be treated as verified references. Keep references visible in both the
single-question view and similar-question cards. Verify that spreadsheet views omit them.
