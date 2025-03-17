import { Button } from "@/components/ui/button";

interface PaginationProps {
  onNext: () => void;
  onPrev: () => void;
  disablePrev: boolean;
}

export default function Pagination({ onNext, onPrev, disablePrev }: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <Button onClick={onPrev} disabled={disablePrev}>Previous</Button>
      <Button onClick={onNext}>Next</Button>
    </div>
  );
}
