import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/internship-coordinator/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/internship-coordinator/register"!</div>
}
