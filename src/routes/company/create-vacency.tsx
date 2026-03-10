import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/company/create-vacency')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/company/create-vacency"!</div>
}
