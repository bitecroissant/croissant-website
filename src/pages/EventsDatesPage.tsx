import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'

export const EventsDatesPage: React.FC = () => {
  const nav = useNavigate()
  const onClickNewEvent = () => {
    nav('/events/new')
  }
  return (
    <>
      <Button onClick={onClickNewEvent} className="fonts-jinbuti text-2xl" variant="link">
        没有事件，去新增
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="fonts-jinbuti text-2xl" variant="link">
            没有记录，去新增
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[375px]">
          <DialogHeader>
            <DialogTitle>
              Edit profile
            </DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="rounded-lg p-6 shadow-lg">
      </div>

    </>
  )
}
