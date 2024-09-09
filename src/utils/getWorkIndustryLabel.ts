import { WorkIndustry } from '@/core/api/posts/createPost'

export const getWorkIndustryLabel = (workIndustry?: string) => {
  if (!workIndustry) return ''

  switch (parseInt(workIndustry)) {
    case WorkIndustry.technology:
      return 'Technology'
    case WorkIndustry.finance:
      return 'Finance'
    case WorkIndustry.marketing:
      return 'Marketing'
    case WorkIndustry.healthcare:
      return 'Healthcare'
    case WorkIndustry.education:
      return 'Education'
    case WorkIndustry.legal:
      return 'Legal'
    case WorkIndustry.engineering:
      return 'Engineering'
    case WorkIndustry.retail:
      return 'Retail'
    case WorkIndustry.hospitality:
      return 'Hospitality'
    case WorkIndustry.government:
      return 'Government'
    default:
      return 'Unknown Industry'
  }
}
