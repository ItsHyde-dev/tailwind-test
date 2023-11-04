"use client"
import { addCategory, addNote, getCategories, getNotes } from "@/functions/categorizedList";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { Disclosure } from "@headlessui/react";
import GhostInput from "./GhostInput";

export default function CategorizedListWidget() {

  // create, delete and edit categories
  // create delete and edit the notes in the categories

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    })
  }, [])

  return (
    <WidgetWrapper title="Categorized List">
      <GhostInput placeholder="+ Add a new category" action={addCategory} />
      {
        categories.map((category: any) => {
          return <Category key={category.id} name={category.name} id={category.id} />
        })
      }
    </WidgetWrapper>
  )
}

export function Category(props: any) {
  let { name, id } = props;

  let openNotesRef = useRef<HTMLButtonElement>(null);

  const expandChildren = () => {
    openNotesRef.current?.click()
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center py-2">
        <ChevronDownIcon className="h-3 w-3 mr-2 cursor-pointer" onClick={expandChildren} />
        {name}
      </div>
      <Disclosure>
        <Disclosure.Button ref={openNotesRef} />
        <Disclosure.Panel className="ml-5">
          <NotesList id={id} />
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

export function NotesList(props: any) {
  let { id } = props;

  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    getNotes(id).then((data) => {
      setNotes(data);
    })
  }, [])
  return (
    <div>
      <GhostInput placeholder="+ Add a new note" action={addNote} />
      {
        notes.map((note: any) => {
          return <Note key={note.id} name={note.name} id={note.id} />
        })
      }
    </div>
  )
}

export function Note(props: any) {
  let { name, id } = props;
  return (
    <div className="flex flex-row items-center py-2">
      {name}
    </div>
  )
}