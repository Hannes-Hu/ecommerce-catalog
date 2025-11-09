
### **5.2 Component Documentation**

**`/docs/COMPONENTS.md`**
```markdown
# Component Documentation

## Product List Component
- **Purpose**: Display products with filtering and search
- **Inputs**: category (optional)
- **State**: Uses NgRx for products, cart, and filters
- **Dependencies**: ProductService, CartService, FilterService

## Checkout Component
- **Purpose**: Multi-step checkout process
- **Steps**: Shipping → Billing → Payment
- **Validation**: Reactive forms with custom validators
- **Integration**: NgRx for state management