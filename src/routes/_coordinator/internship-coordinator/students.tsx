import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_coordinator/internship-coordinator/students',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_coordinator/internship-coordinator/students"!</div>
}
