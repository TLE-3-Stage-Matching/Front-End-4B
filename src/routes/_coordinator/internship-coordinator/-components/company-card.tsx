import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Circle, CircleCheck, Image } from "lucide-react";
import { apiFetch, queryClient } from "@/lib/query-client.ts";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function CompanyCard({ company }) {
  const [active, setActive] = useState(company.is_active);

  const toggleActive = useMutation({
    mutationFn: () =>
      apiFetch(`/api/coordinator/companies/${company.id}`, {
        method: "PUT",
        body: JSON.stringify({
          is_active: !company.is_active,
        }),
      }),
    onSuccess: () => {
      toast.success("Verandering door gevoert");
      queryClient.invalidateQueries({
        queryKey: [`/api/coordinator/companies/${company.id}`],
      });
      setActive(!active);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {company.photo_url == null ? (
            <div className="h-20 w-20 rounded-full bg-secondary text-center">
              <Image
                aria-label={`foto van ${company.name} niet beschikbaar`}
                className="m-auto h-full w-2/3 text-background"
              />
            </div>
          ) : (
            <img
              className="h-20 w-20 rounded-full text-center"
              src={company.photo_url}
              alt={`foto van ${company.name}`}
            />
          )}
          <h2>{company.name}</h2>
        </div>
        <div className="flex gap-2">
          <p>Actief:</p>
          {active ? (
            <CircleCheck
              aria-label={`${company.name} is goedgekeurd`}
              onClick={() => toggleActive.mutate()}
            />
          ) : (
            <Circle
              aria-label={`${company.name} is niet goedgekeurd`}
              onClick={() => toggleActive.mutate()}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default CompanyCard;
