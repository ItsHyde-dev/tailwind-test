"use client";

import { getUserWidgets } from "@/functions/homepage";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ApiResponseHandlerWidget from "./ApiResponseHandlerWidget";
import { AddWidgetsPanel } from "./AddWidgetsPanel";
import { AddWidgetButton } from "./AddWidgetButton";
import Widget from "./Widget";

export default function HomepageWidgets() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["widgets"],
    queryFn: getUserWidgets,
    retry: false,
  });

  let [isOpen, setIsOpen] = useState(false);
  let memoizedWidgetTree = useMemo(() => {
    return ApiResponseHandlerWidget(isLoading, isError,
      () => {
        return (data && Object.keys(data).length) ? Widget.buildWidgetTree(data) : <p>No widgets found</p>
      }
    )
  }, [data])

  return (
    <div className="flex flex-col p-10">

      <div className="flex flex-row items-center">
        <div className="text-2xl font-semibold py-5 pr-5">Hello User</div>
        {AddWidgetButton(setIsOpen)}
      </div>
      {AddWidgetsPanel(isOpen, setIsOpen)}
      <div className="grid grid-cols-5 grid-rows-8 gap-x-2 gap-y-2 h-screen">
        {memoizedWidgetTree}
      </div>
    </div>
  );
}
