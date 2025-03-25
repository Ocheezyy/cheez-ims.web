import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$productId')({
    component: ProductComponent,
})

function ProductComponent() {
    const { productId } = Route.useParams()
    return <div>Product ID: {productId}</div>
}