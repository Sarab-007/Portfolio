import {cn} from '@/src/lib/cn';export default function Container({children,className}:{children:React.ReactNode;className?:string}){return <div className={cn('w-full',className)}>{children}</div>}
