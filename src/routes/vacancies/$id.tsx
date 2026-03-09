import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/vacancies/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/vacancies/$id"!</div>
}
