import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

export default function CheckoutPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Оформлення замовлення</CardTitle>
          <CardDescription>Введіть дані для доставки</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Ім'я та прізвище</Label>
              <Input
                id="name"
                type="text"
                placeholder="Введіть ваше ім'я та прізвище"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input id="phone" type="tel" placeholder="+380" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Адреса доставки</Label>
              <Textarea
                id="address"
                placeholder="Введіть повну адресу доставки"
                rows={3}
                required
              />
            </div>

            <Button className="w-full" type="submit">
              Підтвердити замовлення
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
