import { AdSlot } from '@/components/GoogleAdsense'
import Live2D from '@/components/Live2D'
import Announcement from './Announcement'
import Catalog from './Catalog'

export const SideBar = (props) => {
  const { notice } = props
  return (<>

        <aside>
            <Catalog {...props} />
        </aside>

        <aside>
            <Live2D />
        </aside>

        <aside>
            <Announcement post={notice} />
        </aside>

        <aside>
            <AdSlot/>
        </aside>

    </>)
}
