export interface PolicySection {
  title: string
  content: string[]
}

export interface PolicyPageProps {
  title: string
  effectiveDate: string
  sections: PolicySection[]
}