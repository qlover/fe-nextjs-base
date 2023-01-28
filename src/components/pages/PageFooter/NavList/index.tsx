import { A } from '@/components/common'
import useI18nCommon from '@/hooks/useI18nCommon'
import { FooterNavOptions } from '@/sources/locales/common'
import { mapChildren } from '@/utils/client'
import { FC } from 'react'

type NavListProps = {}

const NavList: FC<NavListProps> = () => {
  const { commonT } = useI18nCommon()
  return (
    <div className="flex flex-row flex-wrap justify-center">
      {mapChildren(FooterNavOptions, ({ key, item }) => {
        return (
          <div key={key} className="w-1/2 md:flex-1">
            <div className="text-uppercase text-ellipsis text-sm text-[#73757a] mb-6">
              <div>{commonT(item.title)}</div>
            </div>

            <div className="text-xs md:text-sm ">
              {mapChildren(item.children, (subProps) => {
                return (
                  <div key={subProps.key} className="mb-4 leading-7">
                    <A
                      href={subProps.item.href}
                      className="hover:text-gray-400 transition-colors duration-100"
                    >
                      {commonT(subProps.item.title)}
                    </A>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default NavList
