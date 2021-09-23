---
author: (Saatvik Sejpal, Anirudh Satish)
geometry: margin=1in
fontsize: 12pt
--- 

#CS124: Interaction Design Lab 1

(Saatvik Sejpal, Anirudh Satish
)

## Design Decisions

### Early Design Process and Alternative Designs
Our design process began with some discussions on what a to-do list is meant to do, and a few simple
sketches of prospective desings that are included below.

![](Page2.png)
We thought about the "plus" button being floating, moving down as we added items.
Although this probably looks cool, this is not ideal as the user needs to search for the "plus"
button each time, and therefore we decided against the same.
We also thought about having a separate section for completed items at the bottom of the screen; however, we decided
to just do away with having a separate section and just float the completed tasks to the bottom of the page when we mark them
completed.

![](Page3.png)

The intent of the "plus" button in our initial designs was to bring up a text box
for input. But after some deliberation, we came to the conclusion that this was unnecessarily
complicated and tedious. Thus we reverted to a fixed text input box at the top of our list, 
with a plus button to add the item to the list.


## Final Design:

When an item is added to our list, and the enter/plus button is hit, it gets added to the list much like it would to a stack, 
that is it gets added to the top, and the other elements would move down to make space for the newly 
added item. 
When an item is clicked, it gets marked as checked, both via the checkbox and the text itself being striked-through. It also floats to the bottom of the page with the other
completed items.
We decided to go with this design as it makes it abundantly clear to the user when an item is marked as checked/completed or not. 

Additionally, if we ever were to have too many elements in the list, a scroll wheel would be visible on the right to allow the user to scroll through
all the items in the list, and this also avoids against any instances of the items of the list overlapping with the delete and hide buttons
at the bottom of the application. 

The "Hide Completed" Button's purpose is to hide all completed/checked tasks, and the "Delete Completed" button is meant 
to delete all completed tasks from the list.

![](Page4.png)

### Screenshots and Images from our implementation:




## Challenges Faced


## Part of the Design you are most proud of: 

