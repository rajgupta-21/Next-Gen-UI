"use client";

import { Pagination } from "@/lib/ui";
import { useState } from "react";

export default function Paginationpreview() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex justify-center w-full">
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
