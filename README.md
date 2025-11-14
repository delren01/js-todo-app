📝 JS To-Do List App

A fully functional, single-page To-Do List application built exclusively with Vanilla JavaScript, HTML, and CSS. This project demonstrates complete client-side data management (CRUD) and advanced DOM manipulation techniques.

Link to Project


How It's Made:

Tech used: HTML, CSS, Vanilla JavaScript

This application was designed to serve as a deep dive into efficient, scalable DOM manipulation and Event Delegation. Every task interaction—from marking a task complete to editing its text—is handled dynamically.

Core Technical Implementation:

Event Delegation for Efficiency: Instead of attaching individual event listeners to every single button on every dynamically created task, a single click listener is attached to the parent <ul> element. This listener efficiently handles all actions (Delete, Complete, Edit), optimizing performance by reducing the total number of event handlers on the page.

Complex DOM Traversal (Two-Level Up): All event listeners utilize careful DOM traversal (using e.target.parentElement.parentElement) to reliably move two levels up the node tree—from the clicked button, past the div.btn-grp container, and up to the main <li> element—ensuring the correct task is always targeted for modification.

Element Swapping for In-Line Editing: The Edit (Update) feature uses the Element.replaceWith() method to handle the dynamic view change:

The static <span> task text is replaced with an interactive <input> field.

The user saves changes by pressing the Enter key, which triggers the reverse swap: the <input> is replaced by a newly created <span> with the updated text.

Optimizations

Event Delegation served as the primary optimization by minimizing system overhead. The entire application runs on one main listener, making the page highly performant even with hundreds of tasks, as the event system never gets overwhelmed by thousands of independent click handlers.
