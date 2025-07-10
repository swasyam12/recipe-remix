import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface IngredientCardProps {
  name: string;
  emoji: string;
  image?: string;
  selected: boolean;
  onToggle: () => void;
}

export const IngredientCard = ({ name, emoji, image, selected, onToggle }: IngredientCardProps) => {
  return (
    <Button
      variant="ingredient"
      size="lg"
      data-selected={selected}
      onClick={onToggle}
      className="h-24 w-full flex-col relative overflow-hidden"
    >
      {image ? (
        <img 
          src={image} 
          alt={name}
          className="w-8 h-8 rounded-full object-cover mb-1"
        />
      ) : (
        <div className="text-2xl mb-1">{emoji}</div>
      )}
      <div className="text-sm font-medium">{name}</div>
      {selected && (
        <div className="absolute top-2 right-2">
          <Check size={16} className="text-primary-foreground" />
        </div>
      )}
    </Button>
  );
};