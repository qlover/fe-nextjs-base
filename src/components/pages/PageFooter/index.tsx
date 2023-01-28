import { PageFooterContainer } from './container'
import NavList from './NavList'

export type PageFooterProps = {}

function PageFooter({}: PageFooterProps) {
  return (
    <footer
      className="bg-[#151922] px-6 py-10"
      aria-labelledby="footer-heading"
    >
      <div className="max-w-[1117px] mx-auto">
        <NavList />

        <div className="mt-8 flex justify-between">
          <p className="text-clight text-sm">
            {new Date().getFullYear()} XXXX Copyright. All rights reserved.
          </p>

          <div></div>
        </div>
      </div>
    </footer>
  )
}

const PageFooterWrapper = (props: PageFooterProps) => (
  <PageFooterContainer.Provider>
    <PageFooter {...props} />
  </PageFooterContainer.Provider>
)

export default PageFooterWrapper
