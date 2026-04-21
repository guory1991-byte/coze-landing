import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'

import heroBottom from './assets/figma/hero-bottom.png'
import cozeLogo from './assets/figma/coze-logo.png'
import heroDownloadIcon from './assets/figma/hero-download-icon.svg'
import heroDownloadQr from './assets/figma/hero-download-qr.png'
import footerPoliceRecord from './assets/figma/footer-police-record.png'
import heroPreview from './assets/figma/hero-cover.png'
import mainFeatureAgentWorld from './assets/figma/main-feature-agent-world.jpg'
import mainFeatureCozeDev from './assets/figma/main-feature-coze-dev.jpg'
import mainFeatureSkillStore from './assets/figma/main-feature-skill-store.jpg'
import mainFeatureVideoCreation from './assets/figma/main-feature-video-creation.jpg'
import compassCozeTag from './assets/figma/compass-coze-tag.svg'
import compassDialFill from './assets/figma/compass-dial-fill.png'
import compassDialRing from './assets/figma/compass-dial-ring.svg'
import compassFrame from './assets/figma/compass-frame.svg'
import compassNeedle from './assets/figma/compass-needle.svg'
import compassPromptTag from './assets/figma/compass-prompt-tag.svg'
import compassSdkShadowOne from './assets/figma/compass-sdk-shadow-1.svg'
import compassSdkShadowTwo from './assets/figma/compass-sdk-shadow-2.svg'
import compassSdkTop from './assets/figma/compass-sdk-top.svg'
import compassTicksLightOne from './assets/figma/compass-ticks-light-1.svg'
import compassTicksLightTwo from './assets/figma/compass-ticks-light-2.svg'
import compassTicksLightThree from './assets/figma/compass-ticks-light-3.svg'
import compassTicksLightFour from './assets/figma/compass-ticks-light-4.svg'
import compassTicksLightFive from './assets/figma/compass-ticks-light-5.svg'
import compassTicksStrong from './assets/figma/compass-ticks-strong.svg'

const topNavDropdowns = [
  {
    label: '产品',
    items: ['扣子', '扣子编程', '扣子罗盘', '扣子开源'],
  },
  {
    label: '企业版',
    items: ['企业版', '部署方案', '行业方案'],
  },
  {
    label: '资源',
    items: ['文档', '精选', '客户与解决方案'],
  },
] as const

const bottomNavigationGroups = [
  {
    label: '产品',
    items: ['扣子', '扣子编程', '扣子罗盘', '扣子开源'],
  },
  {
    label: '企业版',
    items: ['企业版'],
  },
  {
    label: '资源',
    items: ['文档', '精选', '客户与解决方案'],
  },
] as const

const SALES_CONTACT_URL =
  'https://bytedance.larkoffice.com/docx/XJkIdcmbuodq2NxptOmcptdinKg'
const namedExternalLinks: Record<string, string> = {
  扣子: 'https://www.coze.cn/',
  扣子编程: 'https://code.coze.cn/home',
  扣子罗盘: 'https://loop.coze.cn/',
  扣子开源: 'https://github.com/coze-dev',
  企业版: 'https://www.volcengine.com/product/coze-pro',
  部署方案: SALES_CONTACT_URL,
  行业方案: SALES_CONTACT_URL,
  文档: 'https://docs.coze.cn/',
  精选: 'https://www.coze.cn/gallery',
  客户与解决方案: SALES_CONTACT_URL,
}

function getExternalLinkByName(name: string) {
  return namedExternalLinks[name]
}

type MainFeatureTab = {
  key: 'skill-store' | 'video-creation' | 'coze-dev' | 'agent-world'
  label: string
  labelClassName?: string
  labelSizeClassName?: string
  inactiveColorClassName?: string
}

const mainFeatureTabs: readonly MainFeatureTab[] = [
  {
    key: 'skill-store',
    label: '技能商店',
    labelClassName: "font-['Helvetica','Arial',sans-serif]",
    labelSizeClassName: 'text-[16px]',
    inactiveColorClassName: 'text-[rgba(31,35,41,1)]',
  },
  {
    key: 'video-creation',
    label: '视频创作',
    labelSizeClassName: 'text-[16px]',
    inactiveColorClassName: 'text-[rgba(31,35,41,1)]',
  },
  {
    key: 'coze-dev',
    label: '扣子编程',
    labelClassName: "font-['Helvetica','Arial',sans-serif]",
    labelSizeClassName: 'text-[16px]',
    inactiveColorClassName: 'text-[rgba(31,35,41,1)]',
  },
  {
    key: 'agent-world',
    label: 'Agent World',
    labelClassName: "font-['Helvetica','Arial',sans-serif]",
    labelSizeClassName: 'text-[16px]',
    inactiveColorClassName: 'text-[rgba(31,35,41,1)]',
  },
] as const

const mainFeatureContent = {
  'skill-store': {
    title: '给 AI 装上行家大脑',
    subtitle: '一键解锁万级专业技能，让普通人拥有专家级生产力',
    bulletPoints: [
      '一键安装无需调试，覆盖办公、创作、法律等全场景',
      '整合行业最佳实践，稳定交付 PPT、法律报告等专业成果',
      '自然语言即可封装经验，无编程基础也能实现知识数字化',
      '涵盖效率、创作、专业服务等高频场景，新手老手皆适配',
    ],
  },
  'video-creation': {
    title: 'AI 加持的全能创作工场',
    subtitle: '零门槛搞定专业级视频，从脚本到成片一站式输出',
    bulletPoints: [
      '输入主题自动产出爆款脚本，支持风格自定义',
      '音视频同步剪辑，拖拽操作高效出片',
      'AI 推荐适配素材、字幕、配乐，降低创作成本',
      '内置海量滤镜、转场、贴纸，秒提视频质感',
    ],
  },
  'coze-dev': {
    title: '用自然语言创想未来',
    subtitle: '零代码也能开发 AI 应用，从想法到落地仅需分钟级',
    bulletPoints: [
      '用日常对话描述需求，AI 自动生成代码与逻辑，无需编程基础',
      '覆盖智能体、工作流、技能、网页 / 小程序 / APP 全类型开发',
      '拖拽节点即可搭建复杂流程，支持参数调试与逻辑优化',
      '自动完成打包、域名配置、上线发布，无需额外运维',
    ],
  },
  'agent-world': {
    title: '你的 AI 伙伴生态',
    subtitle: '不止单个智能体，更是协作进化的数字世界',
    bulletPoints: [
      '赋予 AI 专属人格、长期记忆与独立身份，越用越懂你',
      '搭载云手机、云电脑与专属工作台，高效执行复杂任务',
      '无缝对接技能商店，一键装配全领域专业能力',
      '多 Agent 自主分工、任务流转，无需人工调度',
    ],
  },
} as const

type SectionShellProps = {
  heightClass: string
  children?: ReactNode
  tone?: 'plain' | 'panel'
}

type HeaderCtaKey = 'sales' | 'trial'
type HeroCtaKey = 'hero-trial' | 'hero-download'
type BottomCtaKey = 'bottom-download' | 'bottom-trial'
type CtaVariant = 'solid' | 'outline'
type MainFeatureTabKey = (typeof mainFeatureTabs)[number]['key']

const mainFeaturePlaceholderImages: Record<MainFeatureTabKey, string> = {
  'skill-store': mainFeatureSkillStore,
  'video-creation': mainFeatureVideoCreation,
  'coze-dev': mainFeatureCozeDev,
  'agent-world': mainFeatureAgentWorld,
}

const faqCards = [
  {
    question: '扣子编程开发的网页/应用如何进行部署？',
    answer: [
      '在扣子编程开发的网页、应用，可直接完成打包、部署与上线。支持使用平台域名，也可自行购买、备案或配置已有自定义域名，需要时还能下载源码。',
    ],
  },
  {
    question: '如何更好地使用扣子系列产品的 AI 能力?',
    answer: [
      '我们始终致力于降低 AI 使用门槛，点击首页「资源 > 文档」查看官方教程，也可在网页底部找到官方社交账号，加入社群与其他用户交流学习。',
    ],
  },
  {
    question: '可以和同事一起使用扣子系列产品吗？',
    answer: [
      '当然可以！通过扣子企业版，您可与同事共享并统一管理产品使用额度，使用企业账号登录，协同开发，并在企业安全范围内共享工具与数据。',
    ],
  },
  {
    question: '扣子编程开发的网页/应用如何进行部署？',
    answer: [
      '在扣子编程开发的网页、应用，可直接完成打包、部署与上线。支持使用平台域名，也可自行购买、备案或配置已有自定义域名，需要时还能下载源码。',
    ],
  },
  {
    question: '如何更好地使用扣子系列产品的 AI 能力?',
    answer: [
      '我们始终致力于降低 AI 使用门槛，点击首页「资源 > 文档」查看官方教程，也可在网页底部找到官方社交账号，加入社群与其他用户交流学习。',
    ],
  },
  {
    question: '可以和公司的同事一起使用扣子系列产品吗？',
    answer: [
      '当然可以！通过扣子企业版，您可与同事共享并统一管理产品使用额度，使用企业账号登录，协同开发，并在企业安全范围内共享工具与数据。',
    ],
  },
] as const

const displayedFaqCards = [
  {
    question: '扣子面对的用户是谁？',
    answer: [
      '如果你需要的不只是对话，而是能处理日常事务、7x24 全天候运行的独立智能实体，扣子就是为你而来。它具备跨云电脑、云手机与多 IM 渠道的行动力，兼具创作与办公能力，更打通海量 Agent 技能。无论你是创业者、创作者、学习者还是职场精英，它都能记住你的习惯、自动执行任务，在数字世界主动为你搜集信息、输出价值。',
    ],
  },
  {
    question: '扣子编程面对的用户是谁？',
    answer: [
      '从零基础用户到专业开发者，都在用扣子编程：个人开发者、设计师、创业团队、无代码业务人员均可轻松使用，还支持 CLI 供 AI Agent 调用。超低成本即可快速搭建营销小程序、个人作品集、工具 APP、Agent 技能与业务工作流。平台不仅拥有多模型 Vibe Coding，更首创 Vibe Infra，一站式搞定域名、数据库与发布部署。',
    ],
  },
  {
    question: '扣子跟其他Claw类产品比有哪些优势？',
    answer: [
      '扣子的核心不同，在于为你打造一个通往 Agent World 的全能智能个体，核心优势：',
      `跨端执行：搭载云手机/云电脑，高效完成复杂任务
专属认知：优化长期记忆，自动学习，无需反复调试
生态互联：依托海量 Agent 生态，灵活装配专家技能
原生创作：视频编辑、AI PPT 能力，一站式创意交付`,
    ],
  },
  ...faqCards.slice(0, 3),
]

type InteractiveCtaButtonProps = {
  label: string
  buttonClassName?: string
  labelClassName?: string
  variant: CtaVariant
  textClassName: string
  paddingClassName: string
  iconFill: string
  hoverIcon?: ReactNode
  onFocus: () => void
  onBlur: () => void
  href?: string
}

const ctaTransitionCurveClass =
  'duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]'
const ctaFlexTransitionClass = `transition-all ${ctaTransitionCurveClass}`
const ctaIconTransitionClass = `transition-all ${ctaTransitionCurveClass}`

function getInteractiveCtaFlexClass(
  activeKey: string | null,
  buttonKey: string,
) {
  if (activeKey === null) {
    return 'flex-1'
  }

  return activeKey === buttonKey ? 'flex-[1.08]' : 'flex-[0.92]'
}

function CtaArrowIcon({ fill }: { fill: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.82413 2.49024C6.52965 2.19894 6.05479 2.20152 5.76349 2.49599C5.47219 2.79047 5.47477 3.26534 5.76925 3.55664L7.48554 5.25439L2.74982 5.25439C2.3356 5.25439 1.99982 5.59018 1.99982 6.00439C1.99982 6.41861 2.3356 6.75439 2.74982 6.75439L7.48377 6.75439L5.77036 8.44226C5.47527 8.73295 5.47171 9.20781 5.76239 9.5029C6.05308 9.79798 6.52794 9.80155 6.82302 9.51086L9.83834 6.54049C9.98125 6.39972 10.0618 6.20757 10.062 6.00697C10.0622 5.80638 9.98206 5.61406 9.83945 5.47299L6.82413 2.49024Z"
        fill={fill}
      />
    </svg>
  )
}

function CtaDownloadHoverIcon({ stroke = '#1F2329' }: { stroke?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 6V3C2 2.44772 2.44772 2 3 2H6"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 6V3C14 2.44772 13.5523 2 13 2H10"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2 10V13C2 13.5523 2.44772 14 3 14H6"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 10V13C14 13.5523 13.5523 14 13 14H10"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 8H12"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MainFeatureTabIcon({
  tab,
  active,
}: {
  tab: MainFeatureTabKey
  active: boolean
}) {
  if (tab === 'skill-store') {
    if (active) {
      return (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5.2002 2.92773C5.86285 2.92784 6.40039 3.46525 6.40039 4.12793V27.8633C6.40039 28.526 5.86285 29.0634 5.2002 29.0635C4.53745 29.0635 4 28.526 4 27.8633V4.12793C4 3.46519 4.53745 2.92773 5.2002 2.92773ZM11.0078 13.0918C11.6704 13.0918 12.2078 13.6285 12.208 14.291V27.8633C12.208 28.526 11.6706 29.0635 11.0078 29.0635C10.3452 29.0633 9.80859 28.5259 9.80859 27.8633V14.291C9.80882 13.6286 10.3453 13.092 11.0078 13.0918ZM16.8164 8.73535C17.4789 8.73559 18.0156 9.27295 18.0156 9.93555V27.8633C18.0156 28.5259 17.4789 29.0632 16.8164 29.0635C16.1537 29.0635 15.6162 28.526 15.6162 27.8633V9.93555C15.6162 9.2728 16.1537 8.73535 16.8164 8.73535ZM22.9062 9.14648C23.5463 8.9751 24.2043 9.3552 24.376 9.99512L29.0156 27.3125C29.1872 27.9527 28.8072 28.6107 28.167 28.7822C27.527 28.9535 26.8697 28.5736 26.6982 27.9336L22.0576 10.6162C21.8864 9.97618 22.2662 9.31798 22.9062 9.14648Z"
            fill="#E8B795"
          />
        </svg>
      )
    }

    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M5.2002 2.92773C5.86285 2.92784 6.40039 3.46525 6.40039 4.12793V27.8633C6.40039 28.526 5.86285 29.0634 5.2002 29.0635C4.53745 29.0635 4 28.526 4 27.8633V4.12793C4 3.46519 4.53745 2.92773 5.2002 2.92773ZM11.0078 13.0918C11.6704 13.0918 12.2078 13.6285 12.208 14.291V27.8633C12.208 28.526 11.6706 29.0635 11.0078 29.0635C10.3452 29.0633 9.80859 28.5259 9.80859 27.8633V14.291C9.80882 13.6286 10.3453 13.092 11.0078 13.0918ZM16.8164 8.73535C17.4789 8.73559 18.0156 9.27295 18.0156 9.93555V27.8633C18.0156 28.5259 17.4789 29.0632 16.8164 29.0635C16.1537 29.0635 15.6162 28.526 15.6162 27.8633V9.93555C15.6162 9.2728 16.1537 8.73535 16.8164 8.73535ZM22.9062 9.14648C23.5463 8.9751 24.2043 9.3552 24.376 9.99512L29.0156 27.3125C29.1872 27.9527 28.8072 28.6107 28.167 28.7822C27.527 28.9535 26.8697 28.5736 26.6982 27.9336L22.0576 10.6162C21.8864 9.97618 22.2662 9.31798 22.9062 9.14648Z"
          fill="#1F2329"
        />
      </svg>
    )
  }

  if (tab === 'video-creation') {
    if (active) {
      return (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.4504 1.98669C25.5196 1.54328 27.5952 2.79662 28.1491 4.86373L29.1844 8.72743C29.3184 9.22747 29.0487 9.74086 28.5751 9.92092L28.4773 9.95218L9.63703 15.0004L28.9997 14.9997L29.1022 15.0046C29.6063 15.0559 29.9999 15.4828 29.9999 16.0005L30.0001 26.0004C30 28.1403 28.3189 29.8883 26.2057 29.9955L25.9997 30.0002L7.99949 29.9998L7.79403 29.9952C5.74893 29.8914 4.1084 28.2513 4.00457 26.2062L3.99992 26.0002L3.99956 15.1926L3.03506 11.593L2.98644 11.3927C2.55737 9.39043 3.71715 7.38166 5.66572 6.75209L5.86349 6.69405L23.2502 2.0353L23.4504 1.98669ZM5.9997 26.0002C5.99979 27.1046 6.89514 27.9998 7.99948 28L25.9996 28.0004C27.1041 28.0004 28.0002 27.1048 28.0004 26.0004L28.0001 17.0004L5.99943 17.0003L5.9997 26.0002ZM6.38112 8.6259C5.31422 8.9118 4.68104 10.0085 4.96691 11.0754L5.74337 13.9732L11.0229 12.5585L9.79583 7.97885C9.77264 7.8923 9.76284 7.80531 9.76281 7.71978L6.38112 8.6259ZM21.2312 9.82321L26.9937 8.27914L26.2173 5.38137C25.9314 4.31445 24.8347 3.68127 23.7678 3.96715L19.9371 4.99358L21.2312 9.82321ZM11.6267 7.22034C11.6695 7.29443 11.7045 7.37467 11.7277 7.46121L12.9548 12.0409L19.2993 10.3409L18.0052 5.51122L11.6267 7.22034Z"
            fill="#E8B795"
          />
        </svg>
      )
    }

    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.4504 1.98669C25.5196 1.54328 27.5952 2.79662 28.1491 4.86373L29.1844 8.72743C29.3184 9.22747 29.0487 9.74086 28.5751 9.92092L28.4773 9.95218L9.63703 15.0004L28.9997 14.9997L29.1022 15.0046C29.6063 15.0559 29.9999 15.4828 29.9999 16.0005L30.0001 26.0004C30 28.1403 28.3189 29.8883 26.2057 29.9955L25.9997 30.0002L7.99949 29.9998L7.79403 29.9952C5.74893 29.8914 4.1084 28.2513 4.00457 26.2062L3.99992 26.0002L3.99956 15.1926L3.03506 11.593L2.98644 11.3927C2.55737 9.39043 3.71715 7.38166 5.66572 6.75209L5.86349 6.69405L23.2502 2.0353L23.4504 1.98669ZM5.9997 26.0002C5.99979 27.1046 6.89514 27.9998 7.99948 28L25.9996 28.0004C27.1041 28.0004 28.0002 27.1048 28.0004 26.0004L28.0001 17.0004L5.99943 17.0003L5.9997 26.0002ZM6.38112 8.6259C5.31422 8.9118 4.68104 10.0085 4.96691 11.0754L5.74337 13.9732L11.0229 12.5585L9.79583 7.97885C9.77264 7.8923 9.76284 7.80531 9.76281 7.71978L6.38112 8.6259ZM21.2312 9.82321L26.9937 8.27914L26.2173 5.38137C25.9314 4.31445 24.8347 3.68127 23.7678 3.96715L19.9371 4.99358L21.2312 9.82321ZM11.6267 7.22034C11.6695 7.29443 11.7045 7.37467 11.7277 7.46121L12.9548 12.0409L19.2993 10.3409L18.0052 5.51122L11.6267 7.22034Z"
          fill="#1F2329"
        />
      </svg>
    )
  }

  if (tab === 'coze-dev') {
    if (active) {
      return (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M21.5 16C22.0523 16 22.5 16.4477 22.5 17C22.5 17.5523 22.0523 18 21.5 18H13.5C12.9477 18 12.5 17.5523 12.5 17C12.5 16.4477 12.9477 16 13.5 16H21.5Z"
            fill="#E8B795"
          />
          <path
            d="M8.29297 7.79297C8.6835 7.40251 9.31653 7.40246 9.70703 7.79297L13.207 11.293C13.4148 11.5007 13.5211 11.7893 13.4971 12.082C13.4728 12.375 13.3202 12.6426 13.0811 12.8135L9.58105 15.3135C9.13164 15.6345 8.50753 15.5305 8.18652 15.0811C7.86551 14.6316 7.96953 14.0075 8.41895 13.6865L10.958 11.8721L8.29297 9.20703C7.90244 8.81651 7.90244 8.18349 8.29297 7.79297Z"
            fill="#E8B795"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25 3C27.2091 3 29 4.79086 29 7V25C29 27.14 27.3194 28.8879 25.2061 28.9951L25 29H7L6.79395 28.9951C4.7488 28.8913 3.10865 27.2512 3.00488 25.2061L3 25V7C3 4.79086 4.79086 3 7 3H25ZM7 5C5.89543 5 5 5.89543 5 7V25C5 26.1046 5.89543 27 7 27H25C26.1046 27 27 26.1046 27 25V7C27 5.89543 26.1046 5 25 5H7Z"
            fill="#E8B795"
          />
        </svg>
      )
    }

    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M21.5 16C22.0523 16 22.5 16.4477 22.5 17C22.5 17.5523 22.0523 18 21.5 18H13.5C12.9477 18 12.5 17.5523 12.5 17C12.5 16.4477 12.9477 16 13.5 16H21.5Z" fill="#1F2329" />
        <path d="M8.29297 7.79297C8.6835 7.40251 9.31653 7.40246 9.70703 7.79297L13.207 11.293C13.4148 11.5007 13.5211 11.7893 13.4971 12.082C13.4728 12.375 13.3202 12.6426 13.0811 12.8135L9.58105 15.3135C9.13164 15.6345 8.50753 15.5305 8.18652 15.0811C7.86551 14.6316 7.96953 14.0075 8.41895 13.6865L10.958 11.8721L8.29297 9.20703C7.90244 8.81651 7.90244 8.18349 8.29297 7.79297Z" fill="#1F2329" />
        <path fillRule="evenodd" clipRule="evenodd" d="M25 3C27.2091 3 29 4.79086 29 7V25C29 27.14 27.3194 28.8879 25.2061 28.9951L25 29H7L6.79395 28.9951C4.7488 28.8913 3.10865 27.2512 3.00488 25.2061L3 25V7C3 4.79086 4.79086 3 7 3H25ZM7 5C5.89543 5 5 5.89543 5 7V25C5 26.1046 5.89543 27 7 27H25C26.1046 27 27 26.1046 27 25V7C27 5.89543 26.1046 5 25 5H7Z" fill="#1F2329" />
      </svg>
    )
  }

  if (active) {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 3C19.7614 3 22 5.23858 22 8C22 10.4189 20.2822 12.4361 18 12.8994V19H25C27.2091 19 29 20.7909 29 23V25C29 27.2091 27.2091 29 25 29H8C5.79086 29 4 27.2091 4 25V23C4 20.7909 5.79086 19 8 19H9V16H11V19H16V12.8994C13.7178 12.4361 12 10.4189 12 8C12 5.23858 14.2386 3 17 3ZM8 21C6.89543 21 6 21.8954 6 23V25C6 26.1046 6.89543 27 8 27H25C26.1046 27 27 26.1046 27 25V23C27 21.8954 26.1046 21 25 21H8ZM17 5C15.3431 5 14 6.34315 14 8C14 9.65685 15.3431 11 17 11C18.6569 11 20 9.65685 20 8C20 6.34315 18.6569 5 17 5Z"
          fill="#E8B795"
        />
      </svg>
    )
  }

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 3C19.7614 3 22 5.23858 22 8C22 10.4189 20.2822 12.4361 18 12.8994V19H25C27.2091 19 29 20.7909 29 23V25C29 27.2091 27.2091 29 25 29H8C5.79086 29 4 27.2091 4 25V23C4 20.7909 5.79086 19 8 19H9V16H11V19H16V12.8994C13.7178 12.4361 12 10.4189 12 8C12 5.23858 14.2386 3 17 3ZM8 21C6.89543 21 6 21.8954 6 23V25C6 26.1046 6.89543 27 8 27H25C26.1046 27 27 26.1046 27 25V23C27 21.8954 26.1046 21 25 21H8ZM17 5C15.3431 5 14 6.34315 14 8C14 9.65685 15.3431 11 17 11C18.6569 11 20 9.65685 20 8C20 6.34315 18.6569 5 17 5Z"
        fill="#1F2329"
      />
    </svg>
  )
}

function InteractiveCtaButton({
  label,
  buttonClassName,
  labelClassName,
  variant,
  textClassName,
  paddingClassName,
  iconFill,
  hoverIcon,
  onFocus,
  onBlur,
  href,
}: InteractiveCtaButtonProps) {
  const variantClassName =
    variant === 'solid'
      ? 'bg-[#1c1917] text-white'
      : 'border border-[rgba(22,24,35,0.05)] bg-white text-[#161823]'
  const labelColorClassName = variant === 'solid' ? 'text-[#FFFFFF]' : 'text-[#161823]'
  const sharedClassName = `group inline-flex w-full min-w-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-full ${variantClassName} ${paddingClassName} ${textClassName} ${ctaTransitionCurveClass} ${buttonClassName ?? ''}`

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={sharedClassName}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <span className={`${labelColorClassName} ${labelClassName ?? ''}`}>{label}</span>
        <span
          className={`flex w-0 shrink-0 items-center justify-center overflow-hidden opacity-0 ${ctaIconTransitionClass} group-hover:ml-0.5 group-hover:w-4 group-hover:opacity-100`}
        >
          <span className="hidden group-hover:inline-flex">
            {hoverIcon ?? <CtaArrowIcon fill={iconFill} />}
          </span>
          <span className="inline-flex group-hover:hidden">
            <CtaArrowIcon fill={iconFill} />
          </span>
        </span>
      </a>
    )
  }

  return (
    <button className={sharedClassName} onFocus={onFocus} onBlur={onBlur}>
      <span className={`${labelColorClassName} ${labelClassName ?? ''}`}>{label}</span>
      <span
        className={`flex w-0 shrink-0 items-center justify-center overflow-hidden opacity-0 ${ctaIconTransitionClass} group-hover:ml-0.5 group-hover:w-4 group-hover:opacity-100`}
      >
        <span className="hidden group-hover:inline-flex">
          {hoverIcon ?? <CtaArrowIcon fill={iconFill} />}
        </span>
        <span className="inline-flex group-hover:hidden">
          <CtaArrowIcon fill={iconFill} />
        </span>
      </span>
    </button>
  )
}

function SectionShell({
  heightClass,
  children,
  tone = 'plain',
}: SectionShellProps) {
  return (
    <section className={`w-full ${heightClass}`}>
      <div className="mx-auto h-full w-full max-w-[1200px] px-4 lg:px-0">
        <div
          className={`h-full w-full ${
            tone === 'panel'
              ? 'rounded-[24px] border border-[rgba(159,124,100,0.16)] bg-[linear-gradient(150deg,#fefdf7_0%,#f0efe7_49%)]'
              : ''
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  )
}

function getStaggerTransitionStyle(
  index: number,
  baseDelay = 0,
  stepDelay = 70,
): CSSProperties {
  return {
    transitionDelay: `${baseDelay + index * stepDelay}ms`,
  }
}

// Ring "stroke" thickness is controlled by the mask (8px) so it stays consistent regardless of scale.
const compassCircleMaskStyle: CSSProperties = {
  WebkitMaskImage:
    'radial-gradient(circle at center, transparent calc(100% - 8px), #000 calc(100% - 8px), #000 100%)',
  maskImage:
    'radial-gradient(circle at center, transparent calc(100% - 8px), #000 calc(100% - 8px), #000 100%)',
}

function App() {
  const [activeHeaderCta, setActiveHeaderCta] = useState<HeaderCtaKey | null>(null)
  const [activeHeroCta, setActiveHeroCta] = useState<HeroCtaKey | null>(null)
  const [activeBottomCta, setActiveBottomCta] = useState<BottomCtaKey | null>(null)
  const [activeMainFeatureTab, setActiveMainFeatureTab] =
    useState<MainFeatureTabKey>('skill-store')
  const [displayedMainFeatureTab, setDisplayedMainFeatureTab] =
    useState<MainFeatureTabKey>('skill-store')
  const [isMainFeatureContentVisible, setIsMainFeatureContentVisible] = useState(true)
  const [isMainFeatureTextVisible, setIsMainFeatureTextVisible] = useState(true)
  const [isMainFeaturePlaceholderVisible, setIsMainFeaturePlaceholderVisible] =
    useState(true)
  const [isHeroVideoModalOpen, setIsHeroVideoModalOpen] = useState(false)
  const [isMainFeaturesInView, setIsMainFeaturesInView] = useState(false)
  const [isOtherFeaturesInView, setIsOtherFeaturesInView] = useState(false)
  const [isFaqInView, setIsFaqInView] = useState(false)
  const mainFeatureTransitionTimeoutRef = useRef<number | null>(null)
  const mainFeatureTextTransitionTimeoutRef = useRef<number | null>(null)
  const mainFeaturePlaceholderTransitionTimeoutRef = useRef<number | null>(null)
  const mainFeatureNavRef = useRef<HTMLDivElement | null>(null)
  const mainFeatureTabLabelRefs = useRef<
    Partial<Record<MainFeatureTabKey, HTMLSpanElement | null>>
  >({})
  const [mainFeatureIndicatorLeft, setMainFeatureIndicatorLeft] = useState(0)
  const heroVideoOverlayRef = useRef<HTMLDivElement | null>(null)
  const heroVideoElementRef = useRef<HTMLVideoElement | null>(null)
  const mainFeaturesSectionRef = useRef<HTMLDivElement | null>(null)
  const otherFeaturesSectionRef = useRef<HTMLDivElement | null>(null)
  const faqSectionRef = useRef<HTMLDivElement | null>(null)
  const heroVideoSrc =
    'https://lf-coze-web-cdn.coze.cn/obj/eden-cn/lm-lgvj/ljhwZthlaukjlkulzlp/space/%E6%89%A3%E5%AD%902.0%E5%8D%87%E7%BA%A7%E8%A7%86%E9%A2%91.mp4'
  const hasHeroVideo = heroVideoSrc.length > 0
  const activeMainFeatureContent = mainFeatureContent[displayedMainFeatureTab]
  const activeMainFeaturePlaceholderImage =
    mainFeaturePlaceholderImages[displayedMainFeatureTab]

  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const shouldIgnoreCardNavigationTarget = (target: EventTarget | null) =>
    target instanceof Element && Boolean(target.closest('a, button'))

  const handleModuleCardClick =
    (url: string) => (event: ReactMouseEvent<HTMLDivElement>) => {
      if (shouldIgnoreCardNavigationTarget(event.target)) {
        return
      }

      openExternalLink(url)
    }

  const handleModuleCardKeyDown =
    (url: string) => (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return
      }

      event.preventDefault()
      openExternalLink(url)
    }

  const closeHeroVideoModal = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {})
    }

    setIsHeroVideoModalOpen(false)
  }

  useEffect(() => {
    return () => {
      if (mainFeatureTransitionTimeoutRef.current !== null) {
        window.clearTimeout(mainFeatureTransitionTimeoutRef.current)
      }
      if (mainFeatureTextTransitionTimeoutRef.current !== null) {
        window.clearTimeout(mainFeatureTextTransitionTimeoutRef.current)
      }
      if (mainFeaturePlaceholderTransitionTimeoutRef.current !== null) {
        window.clearTimeout(mainFeaturePlaceholderTransitionTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isHeroVideoModalOpen) {
      return
    }

    const overlayElement = heroVideoOverlayRef.current
    const videoElement = heroVideoElementRef.current

    if (!overlayElement || !videoElement) {
      return
    }

    const requestFullscreen = async () => {
      try {
        if (!document.fullscreenElement) {
          await overlayElement.requestFullscreen()
        }
      } catch {
        // Fall back to fixed overlay when Fullscreen API is unavailable.
      }

      void videoElement.play().catch(() => {})
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeHeroVideoModal()
      }
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsHeroVideoModalOpen(false)
      }
    }

    requestFullscreen()
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      videoElement.pause()
    }
  }, [isHeroVideoModalOpen])

  useEffect(() => {
    const sections = [
      {
        element: mainFeaturesSectionRef.current,
        onVisible: () => setIsMainFeaturesInView(true),
      },
      {
        element: otherFeaturesSectionRef.current,
        onVisible: () => setIsOtherFeaturesInView(true),
      },
      {
        element: faqSectionRef.current,
        onVisible: () => setIsFaqInView(true),
      },
    ].filter(
      (
        item
      ): item is {
        element: HTMLDivElement
        onVisible: () => void
      } => Boolean(item.element)
    )

    if (sections.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const targetSection = sections.find(
            (section) => section.element === entry.target
          )

          if (!targetSection) {
            return
          }

          targetSection.onVisible()
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    sections.forEach((section) => observer.observe(section.element))

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const updateMainFeatureIndicatorPosition = () => {
      const navElement = mainFeatureNavRef.current
      const activeLabelElement = mainFeatureTabLabelRefs.current[activeMainFeatureTab]

      if (!navElement || !activeLabelElement) {
        return
      }

      const navRect = navElement.getBoundingClientRect()
      const labelRect = activeLabelElement.getBoundingClientRect()
      const indicatorWidth = 64
      const nextLeft =
        labelRect.left - navRect.left + labelRect.width / 2 - indicatorWidth / 2

      setMainFeatureIndicatorLeft(nextLeft)
    }

    updateMainFeatureIndicatorPosition()
    window.addEventListener('resize', updateMainFeatureIndicatorPosition)

    return () => {
      window.removeEventListener('resize', updateMainFeatureIndicatorPosition)
    }
  }, [activeMainFeatureTab])

  const handleMainFeatureTabChange = (tab: MainFeatureTabKey) => {
    if (tab === activeMainFeatureTab) {
      return
    }

    if (mainFeatureTransitionTimeoutRef.current !== null) {
      window.clearTimeout(mainFeatureTransitionTimeoutRef.current)
    }
    if (mainFeatureTextTransitionTimeoutRef.current !== null) {
      window.clearTimeout(mainFeatureTextTransitionTimeoutRef.current)
    }
    if (mainFeaturePlaceholderTransitionTimeoutRef.current !== null) {
      window.clearTimeout(mainFeaturePlaceholderTransitionTimeoutRef.current)
    }

    setActiveMainFeatureTab(tab)
    setIsMainFeatureTextVisible(false)
    setIsMainFeaturePlaceholderVisible(false)
    setIsMainFeatureContentVisible(false)
    mainFeatureTransitionTimeoutRef.current = window.setTimeout(() => {
      setDisplayedMainFeatureTab(tab)
      setIsMainFeatureContentVisible(true)
    }, 80)
    mainFeatureTextTransitionTimeoutRef.current = window.setTimeout(() => {
      setIsMainFeatureTextVisible(true)
    }, 100)
    mainFeaturePlaceholderTransitionTimeoutRef.current = window.setTimeout(() => {
      setIsMainFeaturePlaceholderVisible(true)
    }, 120)
  }

  return (
    <main className="min-h-screen bg-[#f4f4ef] text-[#1f2329]">
      <div className="mx-auto w-full max-w-[1920px]">
        <SectionShell heightClass="h-[60px]">
          <div className="relative z-[10000] flex h-full items-center justify-between overflow-visible">
            <img src={cozeLogo} alt="Coze" className="h-8 w-auto" />

            <div className="ml-auto flex items-center justify-end gap-6">
              <div className="hidden items-center gap-6 font-['Helvetica','Arial',sans-serif] text-[14px] font-medium md:flex">
                {topNavDropdowns.map((menu) => (
                  <div key={menu.label} className="group relative">
                    <button className="inline-flex h-[30px] w-[74px] items-center justify-center gap-0.5 rounded-[8px] text-[14px] font-medium leading-[14px] text-[#1f2329] transition-colors hover:bg-white">
                      {menu.label}
                      <span className="flex h-3 w-3 items-center justify-center transition-transform duration-200 group-hover:rotate-180">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 4.125L4 5.25L6 7.5L8 5.25L9 4.125"
                            stroke="#1F2329"
                            strokeOpacity="0.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    <div className="invisible absolute left-0 top-full z-[9999] mt-2 w-[168px] rounded-[8px] bg-white p-1 opacity-0 shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-150 group-hover:visible group-hover:opacity-100">
                      {menu.items.map((item) => (
                        <a
                          key={item}
                          href={getExternalLinkByName(item)}
                          target="_blank"
                          rel="noreferrer"
                          className="flex w-full items-center rounded-[6px] px-3 py-2 text-left text-[14px] font-normal leading-5 text-[#1f2329] transition-colors hover:bg-[#f4f4ef]"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex w-[220px] items-center justify-end gap-2">
                <div
                  className={`min-w-0 ${ctaFlexTransitionClass} ${getInteractiveCtaFlexClass(activeHeaderCta, 'sales')}`}
                  onMouseEnter={() => setActiveHeaderCta('sales')}
                  onMouseLeave={() => setActiveHeaderCta(null)}
                >
                  <InteractiveCtaButton
                    label="联系销售"
                    variant="outline"
                    paddingClassName="px-4 py-3"
                    textClassName="text-[14px] font-medium leading-none"
                    iconFill="#1F2329"
                    href={SALES_CONTACT_URL}
                    onFocus={() => setActiveHeaderCta('sales')}
                    onBlur={() => setActiveHeaderCta(null)}
                  />
                </div>
                <div
                  className={`min-w-0 ${ctaFlexTransitionClass} ${getInteractiveCtaFlexClass(activeHeaderCta, 'trial')}`}
                  onMouseEnter={() => setActiveHeaderCta('trial')}
                  onMouseLeave={() => setActiveHeaderCta(null)}
                >
                  <InteractiveCtaButton
                    label="免费使用"
                    variant="solid"
                    paddingClassName="px-4 py-3"
                    textClassName="text-[14px] font-medium leading-none"
                    iconFill="#FFFFFF"
                    href={getExternalLinkByName('扣子')}
                    onFocus={() => setActiveHeaderCta('trial')}
                    onBlur={() => setActiveHeaderCta(null)}
                  />
                </div>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell heightClass="h-[800px]">
          <div className="relative h-full">
            <img
              src={heroBottom}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[1920px] max-w-none -translate-x-1/2 select-none"
            />
            <div className="relative z-10 mx-auto flex h-full max-w-[1328px] flex-col items-center pt-16">
              <p className="font-cn-serif w-[420px] whitespace-nowrap text-left text-[44px] font-semibold leading-[56px] text-[#1f2329] max-md:w-auto max-md:text-center">
                hello，Agent world
              </p>
              <div className="mt-6 flex items-center gap-8 max-md:flex-wrap max-md:justify-center">
                <span className="font-cn-serif text-[68px] font-semibold leading-[64px] text-[#1f2329] max-md:text-[40px] max-md:leading-[42px]">
                  满配就位
                </span>
                <span className="font-cn-serif text-[68px] font-semibold leading-[64px] text-[#1f2329] max-md:text-[40px] max-md:leading-[42px]">
                  不止Claw
                </span>
              </div>
              <div className="mt-12 flex w-full justify-center">
                <div className="flex w-full max-w-[272px] items-center gap-4 overflow-visible">
                  <div
                    className={`min-w-0 ${ctaFlexTransitionClass} ${getInteractiveCtaFlexClass(activeHeroCta, 'hero-trial')}`}
                    onMouseEnter={() => setActiveHeroCta('hero-trial')}
                    onMouseLeave={() => setActiveHeroCta(null)}
                  >
                    <InteractiveCtaButton
                      label="免费使用"
                      labelClassName="font-['Helvetica','Arial',sans-serif]"
                      variant="solid"
                      paddingClassName="px-6 py-4"
                      textClassName="text-[20px] font-medium leading-none"
                      iconFill="#FFFFFF"
                      href={getExternalLinkByName('扣子')}
                      onFocus={() => setActiveHeroCta('hero-trial')}
                      onBlur={() => setActiveHeroCta(null)}
                    />
                  </div>
                  <div
                    className={`group/hero-download relative z-40 min-w-0 ${ctaFlexTransitionClass} ${getInteractiveCtaFlexClass(activeHeroCta, 'hero-download')}`}
                    onMouseEnter={() => setActiveHeroCta('hero-download')}
                    onMouseLeave={() => setActiveHeroCta(null)}
                  >
                    <InteractiveCtaButton
                      label="立即下载"
                      buttonClassName="font-['Helvetica','Arial',sans-serif]"
                      labelClassName="font-['Helvetica','Arial',sans-serif]"
                      variant="outline"
                      paddingClassName="px-6 py-4"
                      textClassName="text-[20px] font-medium leading-none"
                      iconFill="#1F2329"
                      hoverIcon={<CtaDownloadHoverIcon stroke="#1F2329" />}
                      onFocus={() => setActiveHeroCta('hero-download')}
                      onBlur={() => setActiveHeroCta(null)}
                    />
                    <div className="pointer-events-none invisible absolute left-1/2 top-full z-40 mt-2 flex h-[208px] w-[176px] -translate-x-1/2 -translate-y-3 scale-[0.92] origin-top flex-col items-center gap-3 rounded-[8px] border border-[rgba(31,35,41,0.06)] bg-white p-2 opacity-0 shadow-[0_24px_48px_rgba(31,35,41,0.16),0_10px_24px_rgba(31,35,41,0.10)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/hero-download:pointer-events-auto group-hover/hero-download:visible group-hover/hero-download:translate-y-0 group-hover/hero-download:scale-100 group-hover/hero-download:opacity-100 group-focus-within/hero-download:pointer-events-auto group-focus-within/hero-download:visible group-focus-within/hero-download:translate-y-0 group-focus-within/hero-download:scale-100 group-focus-within/hero-download:opacity-100">
                      <img
                        src={heroDownloadQr}
                        alt="扫码下载二维码"
                        className="h-[160px] w-[160px] rounded-[6px] object-cover"
                      />
                      <div className="flex items-center justify-center gap-2">
                        <img
                          src={heroDownloadIcon}
                          alt=""
                          aria-hidden="true"
                          className="h-5 w-5 shrink-0"
                        />
                        <p className="text-center text-[14px] font-medium leading-5 text-[#1F2329]">
                          扫码下载
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative mt-16 h-[430px] w-[764px] max-w-full rounded-[40px] border-[8px] border-[rgba(255,255,255,0.48)] shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
                <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-[#0d1020]">
                  <img
                    src={heroPreview}
                    alt="Coze 视频封面"
                    className="absolute inset-0 h-full w-full scale-[1.08] object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,16,0.06)_0%,rgba(5,7,16,0.18)_100%)]" />
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <button
                      type="button"
                      aria-label="播放宣传视频"
                      onClick={() => {
                        if (hasHeroVideo) {
                          setIsHeroVideoModalOpen(true)
                        }
                      }}
                      className="group flex h-24 w-24 items-center justify-center rounded-full bg-[rgba(0,0,0,0.32)] shadow-[0_12px_32px_rgba(0,0,0,0.16)] backdrop-blur-[24px] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] hover:bg-[rgba(0,0,0,0.38)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)] active:scale-[0.98] active:bg-[rgba(0,0,0,0.42)] active:shadow-[0_10px_24px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
                    >
                      <span className="translate-x-[3px] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-active:translate-x-[3px] group-active:scale-[0.96]">
                        <svg
                          width="36"
                          height="39"
                          viewBox="0 0 36 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M32.55 16.4684C34.8833 17.8155 34.8833 21.1845 32.55 22.5316L6.675 37.474C4.34167 38.8211 1.425 37.1366 1.425 34.4424V4.55762C1.425 1.86341 4.34167 0.178938 6.675 1.52604L32.55 16.4684Z"
                            fill="#FFFFFF"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>

        {isHeroVideoModalOpen ? (
          <div
            ref={heroVideoOverlayRef}
            className="fixed inset-0 z-[20000] flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.92)]"
          >
            <button
              type="button"
              aria-label="关闭视频"
              onClick={closeHeroVideoModal}
              className="absolute right-6 top-6 z-[20010] inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-white transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 5L15 15M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <video
              ref={heroVideoElementRef}
              className="h-full w-full bg-black object-contain"
              src={heroVideoSrc}
              poster={heroPreview}
              controls
              autoPlay
              playsInline={false}
            />
          </div>
        ) : null}

        <SectionShell heightClass="h-[788px]">
          <div
            ref={mainFeaturesSectionRef}
            className={`flex h-full origin-center flex-col pt-16 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isMainFeaturesInView
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-2 scale-[0.985] opacity-90'
            }`}
          >
            <h2
              className={`font-cn-serif mx-auto text-center text-[40px] font-semibold leading-[40px] text-[#1f2329] transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isMainFeaturesInView
                  ? 'translate-y-0 opacity-100 blur-0'
                  : 'translate-y-4 opacity-0 blur-[4px]'
              }`}
            >
              任何办公场景，Coze都擅长
            </h2>
            <div
              className={`relative mt-12 h-[88px] transition-[transform,opacity] delay-75 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isMainFeaturesInView
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-5 opacity-0'
              }`}
            >
              <div className="absolute inset-x-0 bottom-0 h-px bg-[rgba(31,35,41,0.05)]" />
              <div ref={mainFeatureNavRef} className="grid h-full grid-cols-4 gap-6">
                {mainFeatureTabs.map((tab, tabIndex) => {
                  const isActive = activeMainFeatureTab === tab.key

                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => handleMainFeatureTabChange(tab.key)}
                      className={`relative flex h-full flex-col items-center gap-2.5 text-center transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isMainFeaturesInView
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-4 opacity-0'
                      }`}
                      style={getStaggerTransitionStyle(tabIndex, 120, 55)}
                    >
                      <MainFeatureTabIcon tab={tab.key} active={isActive} />
                      <span
                        ref={(element) => {
                          mainFeatureTabLabelRefs.current[tab.key] = element
                        }}
                        className={`${tab.labelClassName ?? ''} ${tab.labelSizeClassName ?? 'text-[14px]'} leading-[20px] ${
                          isActive
                            ? "font-medium text-[#1f2329]"
                            : `font-normal ${tab.inactiveColorClassName ?? 'text-[rgba(31,35,41,0.72)]'}`
                        }`}
                      >
                        {tab.label}
                      </span>
                    </button>
                  )
                })}
              </div>
              <span
                className="absolute bottom-0 transition-[left] duration-200 ease-in-out"
                style={{
                  left: `${mainFeatureIndicatorLeft}px`,
                }}
              >
                <svg
                  width="64"
                  height="2"
                  viewBox="0 0 64 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect width="64" height="2" fill="#E8B795" />
                </svg>
              </span>
            </div>

            <div
              className={`mt-12 flex-1 rounded-[24px] border border-[rgba(159,124,100,0.16)] bg-[linear-gradient(150deg,#f6f2ea_0%,#efede4_49%)] transition-[transform,opacity,box-shadow] delay-150 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isMainFeaturesInView
                  ? 'translate-y-0 scale-100 opacity-100 shadow-[0_12px_36px_rgba(141,99,70,0.04)]'
                  : 'translate-y-6 scale-[0.99] opacity-0'
              } ${
                isMainFeatureContentVisible
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            >
              <div className="grid h-full gap-10 lg:grid-cols-[420px_1fr] lg:items-center">
                <div
                  className={`space-y-3 pt-2 transition-opacity duration-500 ease-in-out lg:mt-[128px] lg:self-start lg:pl-[60px] ${
                    isMainFeaturesInView ? 'translate-y-0' : 'translate-y-5'
                  } ${
                    isMainFeaturesInView && isMainFeatureTextVisible
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  <div className="space-y-2">
                    <h3 className="whitespace-nowrap font-['Helvetica','Arial',sans-serif] text-[30px] font-medium leading-[40px] text-[#9c6d4c]">
                      {activeMainFeatureContent.title}
                    </h3>
                    <p className="whitespace-nowrap font-['Helvetica','Arial',sans-serif] text-[16px] font-medium leading-[24px] text-[rgba(156,109,76,0.88)]">
                      {activeMainFeatureContent.subtitle}
                    </p>
                  </div>
                  <div className="space-y-3 font-['Helvetica','Arial',sans-serif]">
                    {activeMainFeatureContent.bulletPoints.map((item, index) => (
                      <div
                        key={item}
                        className={`flex items-center gap-3 whitespace-nowrap transition-opacity duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isMainFeaturesInView ? 'translate-y-0' : 'translate-y-4'
                        } ${
                          isMainFeaturesInView && isMainFeatureTextVisible
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                        style={getStaggerTransitionStyle(index, 80, 35)}
                      >
                        <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M6.12048 5.00381C6.29619 4.67714 6.62286 4 7 4C7.37714 4 7.70333 4.67714 7.87952 5.00381L8.34714 6.12095C8.63688 6.81289 9.18711 7.36312 9.87905 7.65286L10.9962 8.12048C11.3229 8.29619 12 8.62286 12 9C12 9.37714 11.3229 9.70333 10.9962 9.87952L9.87905 10.3471C9.18711 10.6369 8.63688 11.1871 8.34714 11.879L7.87952 12.9962C7.70381 13.3229 7.37714 14 7 14C6.62286 14 6.29667 13.3229 6.12048 12.9962L5.65286 11.879C5.36313 11.1871 4.81289 10.6369 4.12095 10.3471L3.00381 9.87952C2.67714 9.70381 2 9.37714 2 9C2 8.62286 2.67714 8.29667 3.00381 8.12048L4.12095 7.65286C4.81289 7.36312 5.36313 6.81289 5.65286 6.12095L6.12048 5.00381Z"
                              fill="#8D6346"
                            />
                            <path
                              d="M12.4723 1.60229C12.5777 1.40629 12.7737 1 13 1C13.2263 1 13.422 1.40629 13.5277 1.60229L13.8083 2.27257C13.9821 2.68773 14.3123 3.01787 14.7274 3.19171L15.3977 3.47229C15.5937 3.57771 16 3.77371 16 4C16 4.22629 15.5937 4.422 15.3977 4.52771L14.7274 4.80829C14.3123 4.98213 13.9821 5.31227 13.8083 5.72743L13.5277 6.39771C13.4223 6.59371 13.2263 7 13 7C12.7737 7 12.578 6.59371 12.4723 6.39771L12.1917 5.72743C12.0179 5.31227 11.6877 4.98213 11.2726 4.80829L10.6023 4.52771C10.4063 4.42229 10 4.22629 10 4C10 3.77371 10.4063 3.578 10.6023 3.47229L11.2726 3.19171C11.6877 3.01787 12.0179 2.68773 12.1917 2.27257L12.4723 1.60229Z"
                              fill="#8D6346"
                              fillOpacity="0.32"
                            />
                          </svg>
                        </span>
                        <p
                          className={`whitespace-nowrap text-[rgba(103,83,67,0.88)] ${
                            index === 0 || index === 1
                              ? 'h-[20px] text-[14px] leading-[20px]'
                              : index === 2
                                ? 'text-[14px] leading-[20px]'
                                : 'text-[14px] leading-[20px]'
                          }`}
                        >
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className={`h-[406px] w-[640px] max-w-full rounded-[40px] border-[6px] border-[rgba(255,255,255,0.48)] shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:justify-self-end lg:mr-[48px] ${
                    isMainFeaturesInView
                      ? 'translate-x-0 translate-y-0'
                      : 'translate-x-[10px] translate-y-8'
                  } ${isMainFeaturesInView && isMainFeaturePlaceholderVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={getStaggerTransitionStyle(0, 260, 0)}
                >
                  <div className="h-full w-full overflow-hidden rounded-[32px] bg-white/70">
                    <img
                      src={activeMainFeaturePlaceholderImage}
                      alt={`${activeMainFeatureContent.title} 预览图`}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell heightClass="h-[722px]">
          <div
            ref={otherFeaturesSectionRef}
            className={`flex h-full origin-center flex-col pt-16 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isOtherFeaturesInView
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-2 scale-[0.985] opacity-90'
            }`}
          >
            <h2
              className={`font-cn-serif mx-auto text-center text-[40px] font-semibold leading-[40px] text-[#1f2329] transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOtherFeaturesInView
                  ? 'translate-y-0 opacity-100 blur-0'
                  : 'translate-y-4 opacity-0 blur-[4px]'
              }`}
            >
              全新扣子，全面强大
            </h2>

            <div
              className={`mt-12 grid gap-5 transition-[transform,opacity] delay-150 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:grid-cols-[590px_590px] lg:grid-rows-[243px_243px] lg:justify-center ${
                isOtherFeaturesInView
                  ? 'translate-y-0 scale-100 opacity-100'
                  : 'translate-y-5 scale-[0.99] opacity-0'
              }`}
            >
              <div
                className={`transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:row-span-2 ${
                  isOtherFeaturesInView
                    ? 'translate-x-0 translate-y-0 opacity-100'
                    : 'translate-x-[-10px] translate-y-8 opacity-0'
                }`}
                style={getStaggerTransitionStyle(0, 180, 90)}
              >
                <div
                  role="link"
                  tabIndex={0}
                  aria-label="打开扣子罗盘"
                  onClick={handleModuleCardClick(getExternalLinkByName('扣子罗盘'))}
                  onKeyDown={handleModuleCardKeyDown(getExternalLinkByName('扣子罗盘'))}
                  className="group relative h-[506px] w-full cursor-pointer overflow-hidden rounded-[24px] border border-[rgba(159,124,100,0.16)] bg-[linear-gradient(150deg,#f7f4eb_0%,#efede4_49%)] px-8 pt-9 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(141,99,70,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9C6D4C]/30 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent lg:w-[590px]"
                >
                <div className="relative z-10">
                  <div className="max-w-[510px]">
                  <h3 className="font-['Helvetica','Arial',sans-serif] text-[30px] font-medium leading-[40px] text-[#9c6d4c]">
                    扣子罗盘
                  </h3>
                  <p className="mt-3 max-w-[255px] text-[14px] leading-[20px] text-[rgba(103,83,67,0.88)]">
                    依托字节跳动企业级 AI 开发平台能力，为专业开发者提供从智能体构建到全生命周期管理的一站式解决方案，大幅提升 AI Agent 开发效率与质量
                  </p>
                  <a
                    href={getExternalLinkByName('扣子罗盘')}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-4 inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full bg-[#9c6d4c] px-4 py-3 text-[16px] font-medium leading-none text-white transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(141,99,70,0.2)]"
                  >
                    <span className="text-[#FFFFFF]">立即体验</span>
                    <span className="flex w-0 shrink-0 items-center justify-center overflow-hidden opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ml-1 group-hover:w-4 group-hover:opacity-100">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M6.82413 2.49024C6.52965 2.19894 6.05479 2.20152 5.76349 2.49599C5.47219 2.79047 5.47477 3.26534 5.76925 3.55664L7.48554 5.25439L2.74982 5.25439C2.3356 5.25439 1.99982 5.59018 1.99982 6.00439C1.99982 6.41861 2.3356 6.75439 2.74982 6.75439L7.48377 6.75439L5.77036 8.44226C5.47527 8.73295 5.47171 9.20781 5.76239 9.5029C6.05308 9.79798 6.52794 9.80155 6.82302 9.51086L9.83834 6.54049C9.98125 6.39972 10.0618 6.20757 10.062 6.00697C10.0622 5.80638 9.98206 5.61406 9.83945 5.47299L6.82413 2.49024Z"
                          fill="#FFFFFF"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
                >
                  <div className="relative h-[280px] w-[420px] translate-y-[5px]">
                    <img
                      src={compassFrame}
                      alt=""
                      className="absolute z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-2px]"
                      style={{ left: '48px', top: '24px', width: '308px', height: '120px' }}
                    />

                    <img
                      src={compassDialFill}
                      alt=""
                      className="absolute z-20 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-2px] group-hover:scale-[1.008]"
                      style={{ left: '27.9px', top: '96.46px', width: '348px', height: '348px' }}
                    />
                    <img
                      src={compassDialRing}
                      alt=""
                      className="absolute z-30 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-3px]"
                      style={{ left: '55.5px', top: '125.3px', width: '292px', height: '292px' }}
                    />
                    <img
                      src={compassTicksStrong}
                      alt=""
                      className="absolute z-40 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-3px]"
                      style={{ left: '57.6px', top: '125.26px', width: '289.8px', height: '289.8px' }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute z-[45]"
                      style={{ left: '55.5px', top: '125.3px', width: '292px', height: '292px' }}
                    >
                      <div
                        className="absolute inset-0 rounded-full opacity-90"
                        style={{
                          ...compassCircleMaskStyle,
                          background:
                            'linear-gradient(180deg, rgba(232,183,149,0.42) 0%, rgba(156,109,76,0.18) 40%, rgba(141,99,70,0.10) 100%)',
                        }}
                      />
                      <div
                        className="absolute inset-0 origin-center rotate-[60deg] opacity-90 transition-[transform,clip-path,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [clip-path:polygon(50%_50%,49%_0%,58%_1%,68%_5%,78%_12%,86%_22%,91%_34%,94%_46%,95%_56%,50%_50%)] group-hover:rotate-[-10deg] group-hover:opacity-100 group-hover:[clip-path:polygon(50%_50%,46%_0%,60%_1%,74%_6%,86%_15%,95%_28%,100%_43%,100%_57%,98%_68%,50%_50%)]"
                        style={{
                          ...compassCircleMaskStyle,
                          background:
                            'conic-gradient(from 270deg, rgba(232,183,149,0.58) 0deg, rgba(156,109,76,0.30) 52deg, rgba(141,99,70,0.12) 74deg, rgba(156,109,76,0) 102deg)',
                        }}
                      />
                    </div>
                    <img
                      src={compassTicksLightOne}
                      alt=""
                      className="absolute z-[35] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-2px]"
                      style={{ left: '45.85px', top: '113.21px', width: '313.31px', height: '313.31px' }}
                    />
                    <img
                      src={compassTicksLightTwo}
                      alt=""
                      className="absolute z-[35] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-2px]"
                      style={{ left: '34.99px', top: '102.35px', width: '335.03px', height: '335.03px' }}
                    />
                    <img
                      src={compassTicksLightThree}
                      alt=""
                      className="absolute z-[35] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-2px]"
                      style={{ left: '25.4px', top: '92.76px', width: '354.2px', height: '354.2px' }}
                    />
                    <img
                      src={compassTicksLightFour}
                      alt=""
                      className="absolute z-[35] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-2px]"
                      style={{ left: '17.16px', top: '84.53px', width: '370.67px', height: '370.67px' }}
                    />
                    <img
                      src={compassTicksLightFive}
                      alt=""
                      className="absolute z-[35] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-2px]"
                      style={{ left: '10.34px', top: '77.7px', width: '384.33px', height: '384.33px' }}
                    />

                    <img
                      src={compassNeedle}
                      alt=""
                      className="absolute z-50 origin-[53.3%_49.7%] rotate-[60deg] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[-10deg]"
                      style={{ left: '123.65px', top: '197.23px', width: '159px', height: '141.03px' }}
                    />

                    <div
                      className="absolute z-[60] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-6px] group-hover:scale-[1.02]"
                      style={{ left: '165.9px', top: '-0.3px', width: '69px', height: '60.6px' }}
                    >
                      <img
                        src={compassSdkShadowTwo}
                        alt=""
                        className="absolute left-0 top-[6px] z-20 h-[47.4px] w-[69px]"
                      />
                      <img
                        src={compassSdkShadowOne}
                        alt=""
                        className="absolute left-0 top-[13.2px] z-10 h-[47.4px] w-[69px]"
                      />
                      <img
                        src={compassSdkTop}
                        alt=""
                        className="absolute left-0 top-0 z-30 h-[47.4px] w-[69px]"
                      />
                      <span className="absolute left-[19.2px] top-[14.4px] z-40 font-['Helvetica','Arial',sans-serif] text-[14.4px] font-semibold leading-[17px] text-[#8D6346]">
                        SDK
                      </span>
                    </div>

                    <img
                      src={compassPromptTag}
                      alt=""
                      className="absolute z-[60] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[-6px] group-hover:translate-y-[-4px]"
                      style={{ left: '-23px', top: '60px', width: '138px', height: '32px' }}
                    />
                    <img
                      src={compassCozeTag}
                      alt="扣子罗盘功能示意图"
                      className="absolute z-[60] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[6px] group-hover:translate-y-[-4px]"
                      style={{ left: '297px', top: '63px', width: '121px', height: '32px' }}
                    />
                  </div>
                </div>
              </div>
              </div>

              <div
                className={`transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOtherFeaturesInView
                    ? 'translate-x-0 translate-y-0 opacity-100'
                    : 'translate-x-[12px] translate-y-5 opacity-0'
                }`}
                style={getStaggerTransitionStyle(1, 180, 90)}
              >
                <div
                  role="link"
                  tabIndex={0}
                  aria-label="打开扣子企业版"
                  onClick={handleModuleCardClick(getExternalLinkByName('企业版'))}
                  onKeyDown={handleModuleCardKeyDown(getExternalLinkByName('企业版'))}
                  className="group relative h-[243px] w-full cursor-pointer overflow-hidden rounded-[24px] border border-[rgba(159,124,100,0.16)] bg-[#F0EFE7] px-10 pt-10 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(141,99,70,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8D6346]/30 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent lg:w-[590px]"
                >
                <div className="relative z-10">
                  <h3 className="font-['PingFang_SC','PingFang SC',sans-serif] text-[30px] font-medium leading-[40px] text-[#8D6346]">
                    扣子企业版
                  </h3>
                  <p className="mt-3 max-w-[255px] text-[14px] leading-[20px] text-[rgba(31,35,41,0.75)]">
                    在企业级安全环境与团队协作的深度融合场景下，高效的协同机制及丰富的功能矩阵，为企业打造了一套生产力解决方案。
                  </p>
                  <a
                    href={getExternalLinkByName('企业版')}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-4 inline-flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full bg-[#8D6346] px-4 py-3 font-['PingFang_SC','PingFang SC',sans-serif] text-[14px] font-medium leading-[14px] text-white transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(141,99,70,0.18)]"
                  >
                    <span className="text-[#FFFFFF]">立即体验</span>
                    <span className="flex w-0 shrink-0 items-center justify-center overflow-hidden opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ml-1 group-hover:w-4 group-hover:opacity-100">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M6.82413 2.49024C6.52965 2.19894 6.05479 2.20152 5.76349 2.49599C5.47219 2.79047 5.47477 3.26534 5.76925 3.55664L7.48554 5.25439L2.74982 5.25439C2.3356 5.25439 1.99982 5.59018 1.99982 6.00439C1.99982 6.41861 2.3356 6.75439 2.74982 6.75439L7.48377 6.75439L5.77036 8.44226C5.47527 8.73295 5.47171 9.20781 5.76239 9.5029C6.05308 9.79798 6.52794 9.80155 6.82302 9.51086L9.83834 6.54049C9.98125 6.39972 10.0618 6.20757 10.062 6.00697C10.0622 5.80638 9.98206 5.61406 9.83945 5.47299L6.82413 2.49024Z"
                          fill="#FFFFFF"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 bottom-[-2px] z-0 h-[177px] w-[241px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:scale-[1.02]"
                >
                  <div className="absolute left-[61px] top-0 h-[177px] w-[84px] rounded-t-[2px] border border-[rgba(141,99,70,0.32)] bg-[#F0EFE7] shadow-[inset_0_8px_12px_rgba(103,46,11,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[-6px] group-hover:translate-y-[-6px]" />
                  <div className="absolute left-[129px] top-[66px] h-[111px] w-[68px] rounded-t-[2px] border border-[rgba(141,99,70,0.32)] bg-[#F0EFE7] shadow-[inset_0_8px_12px_rgba(103,46,11,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[5px] group-hover:translate-y-[-10px]" />

                  <span className="absolute left-[81px] top-[31px] h-[2px] w-[44px] bg-[#8D6447] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[-5px] group-hover:translate-y-[-6px]" />
                  <span className="absolute left-[81px] top-[51px] h-[2px] w-[44px] bg-[#8D6447] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[-5px] group-hover:translate-y-[-6px]" />
                  <span className="absolute left-[81px] top-[71px] h-[2px] w-[22px] bg-[#8D6447] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[-5px] group-hover:translate-y-[-6px]" />
                  <span className="absolute left-[147px] top-[96px] h-[2px] w-[32px] bg-[#8D6447] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[4px] group-hover:translate-y-[-9px]" />
                  <span className="absolute left-[147px] top-[116px] h-[2px] w-[22px] bg-[#8D6447] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[4px] group-hover:translate-y-[-9px]" />

                  <div className="absolute left-[1px] top-[123px] inline-flex items-center gap-[2px] rounded-[9.6px] border border-[#8D6346] bg-[#FDFCF5] px-2 py-1.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[8px] group-hover:translate-y-[-8px] group-hover:scale-[1.03]">
                    <span className="inline-flex h-5 w-5 items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.7998 4.75316C2.7998 4.06448 3.24049 3.45306 3.89384 3.23527L8.98787 1.53726C9.64473 1.31831 10.3549 1.31831 11.0117 1.53726L16.1058 3.23527C16.7591 3.45305 17.1998 4.06448 17.1998 4.75317V11.0342C17.1998 13.3584 15.9397 15.5 13.9079 16.6288L10.3883 18.5841C10.1467 18.7183 9.85291 18.7183 9.61129 18.5841L6.09169 16.6288C4.05991 15.5 2.7998 13.3584 2.7998 11.0342V4.75316Z"
                          fill="#8D6346"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.5108 7.45725C12.8232 7.14483 13.3297 7.14483 13.6422 7.45725C13.9546 7.76966 13.9546 8.2762 13.6422 8.58862L10.0587 12.1721C10.0464 12.1863 10.0335 12.2001 10.02 12.2136C9.70756 12.526 9.20103 12.526 8.88861 12.2136L6.96528 10.2903C6.65286 9.97786 6.65286 9.47133 6.96528 9.15891C7.2777 8.84649 7.78423 8.84649 8.09665 9.15891L9.45289 10.5152L12.5108 7.45725Z"
                          fill="#FDFCF5"
                        />
                      </svg>
                    </span>
                    <span className="font-['PingFang_SC','PingFang SC',sans-serif] text-[14.4px] font-semibold leading-[20px] text-[#8D6346]">
                      安全环境
                    </span>
                  </div>
                </div>
              </div>
              </div>

              <div
                className={`transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOtherFeaturesInView
                    ? 'translate-x-0 translate-y-0 opacity-100'
                    : 'translate-x-[16px] translate-y-6 opacity-0'
                }`}
                style={getStaggerTransitionStyle(2, 180, 90)}
              >
                <div
                  role="link"
                  tabIndex={0}
                  aria-label="打开扣子开源"
                  onClick={handleModuleCardClick(getExternalLinkByName('扣子开源'))}
                  onKeyDown={handleModuleCardKeyDown(getExternalLinkByName('扣子开源'))}
                  className="group relative h-[243px] w-full cursor-pointer overflow-hidden rounded-[24px] border border-[rgba(159,124,100,0.16)] bg-[linear-gradient(150deg,#f7f4eb_0%,#efede4_49%)] px-8 pt-9 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(141,99,70,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9C6D4C]/30 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent lg:w-[590px]"
                >
                <div className="relative z-10 max-w-[510px]">
                  <h3 className="font-['Helvetica','Arial',sans-serif] text-[30px] font-medium leading-[40px] text-[#9c6d4c]">
                    扣子开源
                  </h3>
                  <p className="mt-3 max-w-[255px] text-[14px] leading-[20px] text-[rgba(103,83,67,0.88)]">
                    扣子 AI 开发与调试工具以开源之力，为你解锁私有化 AI 开发平台的无限可能，让 AI 开发更自主、更安全、更高效。
                  </p>
                  <a
                    href={getExternalLinkByName('扣子开源')}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-4 inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full bg-[#9c6d4c] px-4 py-3 text-[16px] font-medium leading-none text-white transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(141,99,70,0.2)]"
                  >
                    <span className="text-[#FFFFFF]">立即体验</span>
                    <span className="flex w-0 shrink-0 items-center justify-center overflow-hidden opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ml-1 group-hover:w-4 group-hover:opacity-100">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M6.82413 2.49024C6.52965 2.19894 6.05479 2.20152 5.76349 2.49599C5.47219 2.79047 5.47477 3.26534 5.76925 3.55664L7.48554 5.25439L2.74982 5.25439C2.3356 5.25439 1.99982 5.59018 1.99982 6.00439C1.99982 6.41861 2.3356 6.75439 2.74982 6.75439L7.48377 6.75439L5.77036 8.44226C5.47527 8.73295 5.47171 9.20781 5.76239 9.5029C6.05308 9.79798 6.52794 9.80155 6.82302 9.51086L9.83834 6.54049C9.98125 6.39972 10.0618 6.20757 10.062 6.00697C10.0622 5.80638 9.98206 5.61406 9.83945 5.47299L6.82413 2.49024Z"
                          fill="#FFFFFF"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 bottom-0 z-0 h-[209px] w-[208px]"
                >
                  <svg
                    className="absolute left-[18px] top-[48px] h-[89px] w-[120px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[-8px] group-hover:translate-y-[-8px]"
                    viewBox="0 0 120 89"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.600098 0V35.7755C0.600098 39.0892 3.28639 41.7755 6.6001 41.7755H112.6C115.914 41.7755 118.6 44.4618 118.6 47.7755V89"
                      stroke="#8D6346"
                      strokeOpacity="0.64"
                      strokeWidth="1.2"
                    />
                  </svg>

                  <div className="absolute left-0 top-0 h-12 w-[152px] rounded-[8px] border border-[rgba(141,99,70,0.32)] bg-[#F0EFE7] shadow-[inset_0_8px_12px_rgba(103,46,11,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[-8px] group-hover:translate-y-[-8px]" />
                  <div className="absolute left-0 top-32 h-12 w-[152px] rounded-[8px] border border-[rgba(141,99,70,0.32)] bg-[#F0EFE7] shadow-[inset_0_8px_12px_rgba(103,46,11,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[8px] group-hover:translate-y-[-3px]" />

                  <span className="absolute left-14 top-[23px] h-[2px] w-10 bg-[#8D6447] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[-8px] group-hover:translate-y-[-8px]" />
                  <span className="absolute left-14 top-[151px] h-[2px] w-10 bg-[#8D6447] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[8px] group-hover:translate-y-[-3px]" />

                  <div className="absolute left-[29px] top-[72px] inline-flex items-center gap-[2px] rounded-[9.6px] border border-[#8D6346] bg-[#FDFCF5] px-2 py-1.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[4px] group-hover:translate-y-[-12px] group-hover:scale-[1.03]">
                    <span className="inline-flex h-5 w-5 items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.99996 1.00049C5.08225 0.94817 1.05392 5.07629 1 10.2237C1.01863 14.2314 3.50367 17.7698 7.15275 18.9844C7.60275 19.07 7.76631 18.7874 7.76631 18.539V16.9718C5.26277 17.5285 4.7309 15.7387 4.7309 15.7387C4.56432 15.1769 4.20998 14.6966 3.73269 14.3856C2.91452 13.8204 3.79813 13.829 3.79813 13.829C4.081 13.8685 4.35162 13.9747 4.58968 14.1393C4.82774 14.3039 5.02706 14.5229 5.17267 14.7796C5.70096 15.7383 6.86558 16.0773 7.79096 15.5418C7.83661 15.0729 8.03948 14.636 8.3636 14.3086C6.36725 14.0773 4.27277 13.2894 4.27277 9.75265C4.25483 8.83016 4.58049 7.93652 5.18092 7.26059C4.90753 6.46846 4.93981 5.59609 5.27092 4.82843C5.60208 4.06086 6.03185 4.58007 7.7254 5.77047C9.19966 5.35933 10.7512 5.35933 12.2254 5.77047C13.9436 4.58007 14.68 4.82843 14.68 4.82843C15.0111 5.5961 15.0434 6.46847 14.77 7.26061C15.3843 7.92418 15.7276 8.8118 15.7272 9.7355C15.7272 13.2809 13.6164 14.0603 11.6364 14.2914C11.8532 14.5118 12.0207 14.7797 12.1268 15.0758C12.2328 15.372 12.2749 15.689 12.25 16.0041V18.5305C12.25 18.8302 12.4136 19.07 12.8636 18.9757C16.5018 17.7538 18.9775 14.2228 19 10.2237C18.9461 5.07629 14.9178 0.94817 9.99996 1.00049Z"
                          fill="#8D6346"
                        />
                      </svg>
                    </span>
                    <span className="font-['PingFang_SC','PingFang SC',sans-serif] text-[14.4px] font-semibold leading-[20px] text-[#8D6346]">
                      代码开源
                    </span>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell heightClass="h-[552px]">
          <div
            ref={faqSectionRef}
            className={`flex h-[552px] origin-center flex-col pt-4 pb-12 font-['Helvetica','Arial',sans-serif] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isFaqInView
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-2 scale-[0.985] opacity-90'
            }`}
          >
            <h2
              className={`font-cn-serif mx-auto text-center text-[40px] font-semibold leading-[40px] text-[#1f2329] transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isFaqInView
                  ? 'translate-y-0 opacity-100 blur-0'
                  : 'translate-y-4 opacity-0 blur-[4px]'
              }`}
            >
              常见问题
            </h2>
            <section
              className={`mt-12 mb-[232px] grid flex-1 gap-x-5 gap-y-6 transition-[transform,opacity] delay-150 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:grid-cols-3 ${
                isFaqInView
                  ? 'translate-y-0 scale-100 opacity-100'
                  : 'translate-y-5 scale-[0.99] opacity-0'
              }`}
            >
              {displayedFaqCards.map((item, cardIndex) => (
                <div
                  key={`${item.question}-${cardIndex}`}
                  className={`transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isFaqInView
                      ? 'translate-x-0 translate-y-0 opacity-100'
                      : cardIndex % 3 === 1
                        ? 'translate-y-7 opacity-0'
                        : cardIndex % 3 === 2
                          ? 'translate-x-[10px] translate-y-6 opacity-0'
                          : 'translate-x-[-10px] translate-y-6 opacity-0'
                  }`}
                  style={getStaggerTransitionStyle(cardIndex, 180, 70)}
                >
                  <div
                    className={`w-full justify-self-center rounded-[14px] border border-[rgba(159,124,100,0.16)] bg-[linear-gradient(150deg,#f7f4eb_0%,#efede4_49%)] px-2 pt-5 pb-2 transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(31,35,41,0.12)] lg:w-[386px] ${
                      cardIndex >= 3 ? 'h-[164px]' : 'h-[260px]'
                    }`}
                  >
                    <div className="px-3 pt-0 text-[#9c6d4c]">
                      <div className="flex items-start gap-2">
                        <span className="shrink-0" aria-hidden="true">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.4169 17.9091C8.70808 17.9091 7.27613 17.4545 6.12107 16.5455C4.95019 15.6212 4.29355 14.4091 4.15115 12.9091C3.9771 11.1515 3.95336 9.06061 4.07995 6.63636C4.15906 4.84849 4.77614 3.45455 5.9312 2.45455C7.03879 1.48485 8.53403 1 10.4169 1C12.3157 1 13.8425 1.48485 14.9976 2.45455C16.2001 3.45455 16.8409 4.84849 16.9201 6.63636C17.0466 9.06061 17.0229 11.1515 16.8489 12.9091C16.7223 14.197 16.2634 15.2576 15.4723 16.0909L16.7064 17.5L14.8315 19L13.4312 17.4091C12.5293 17.7424 11.5245 17.9091 10.4169 17.9091ZM10.4169 15.1818C10.8283 15.1515 11.1369 15.1136 11.3426 15.0682L9.96598 13.5227L11.9122 12.0455L13.3125 13.6364C13.4865 13.3182 13.6131 12.8939 13.6922 12.3636C13.8821 10.7121 13.9058 8.93182 13.7634 7.02273C13.6843 5.84091 13.3679 4.98485 12.8141 4.45455C12.2919 3.95455 11.4929 3.70455 10.4169 3.70455C9.45175 3.73485 8.70808 4.00758 8.18593 4.52273C7.61632 5.06818 7.29986 5.90152 7.23657 7.02273C7.12581 9.12879 7.14955 10.9091 7.30777 12.3636C7.51347 14.2424 8.54985 15.1818 10.4169 15.1818Z"
                              fill="#8D6346"
                            />
                          </svg>
                        </span>
                        <p className="font-['Helvetica','Arial',sans-serif] text-[16px] font-medium leading-[20px]">
                          {item.question}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`mt-[18px] w-full rounded-[12px] bg-white/88 px-4 pt-3 pb-3 lg:w-[370px] ${
                        cardIndex >= 3 ? 'h-[96px]' : 'h-[192px]'
                      }`}
                    >
                      <div className="space-y-3">
                        {item.answer.map((paragraph, index) => (
                          <p
                            key={`${item.question}-${index}`}
                            className="whitespace-pre-line text-[14px] leading-[24px] text-[rgba(31,35,41,0.72)]"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </SectionShell>

        <SectionShell heightClass="mt-12 h-[292px]">
          <div className="relative isolate grid h-full items-start gap-8 pt-[72px] pb-[72px] before:absolute before:left-1/2 before:top-0 before:h-px before:w-screen before:-translate-x-1/2 before:bg-[rgba(31,35,41,0.08)] after:absolute after:left-1/2 after:bottom-0 after:h-px after:w-screen after:-translate-x-1/2 after:bg-[rgba(31,35,41,0.08)] lg:grid-cols-[1fr_360px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-screen -translate-x-1/2 bg-[#F0EFE7]"
            />
            <div className="max-w-[420px]">
              <h3 className="font-cn-serif text-[28px] font-semibold leading-[28px] text-[#1f2329]">
                职场AI，就用扣子
              </h3>
              <p className="mt-3 max-w-[360px] text-[14px] leading-[22px] text-[rgba(31,35,41,0.75)]">
                你的 AI 超级合伙人，替你感知周边的工具属性，让 AI 从“懂指令”升级为“主动做事”，成为你不掉线的数字伙伴。
              </p>
              <div className="flex w-[220px] items-center gap-2 pt-6">
                <div
                  className={`group/bottom-download relative z-40 min-w-0 ${ctaFlexTransitionClass} ${getInteractiveCtaFlexClass(activeBottomCta, 'bottom-download')}`}
                  onMouseEnter={() => setActiveBottomCta('bottom-download')}
                  onMouseLeave={() => setActiveBottomCta(null)}
                >
                  <InteractiveCtaButton
                    label="立即下载"
                    variant="outline"
                    paddingClassName="px-4 py-3"
                    textClassName="h-[38px] text-[14px] font-medium leading-[14px]"
                    iconFill="#1F2329"
                    hoverIcon={<CtaDownloadHoverIcon stroke="#1F2329" />}
                    onFocus={() => setActiveBottomCta('bottom-download')}
                    onBlur={() => setActiveBottomCta(null)}
                  />
                  <div className="pointer-events-none invisible absolute bottom-full left-1/2 z-40 mb-[6px] flex h-[208px] w-[176px] -translate-x-1/2 -translate-y-3 scale-[0.92] origin-bottom flex-col items-center gap-3 rounded-[8px] border border-[rgba(31,35,41,0.06)] bg-white p-2 opacity-0 shadow-[0_24px_48px_rgba(31,35,41,0.16),0_10px_24px_rgba(31,35,41,0.10)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/bottom-download:pointer-events-auto group-hover/bottom-download:visible group-hover/bottom-download:translate-y-0 group-hover/bottom-download:scale-100 group-hover/bottom-download:opacity-100 group-focus-within/bottom-download:pointer-events-auto group-focus-within/bottom-download:visible group-focus-within/bottom-download:translate-y-0 group-focus-within/bottom-download:scale-100 group-focus-within/bottom-download:opacity-100">
                    <img
                      src={heroDownloadQr}
                      alt="扫码下载二维码"
                      className="h-[160px] w-[160px] rounded-[6px] object-cover"
                    />
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={heroDownloadIcon}
                        alt=""
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0"
                      />
                      <p className="text-center text-[14px] font-medium leading-5 text-[#1F2329]">
                        扫码下载
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`min-w-0 ${ctaFlexTransitionClass} ${getInteractiveCtaFlexClass(activeBottomCta, 'bottom-trial')}`}
                  onMouseEnter={() => setActiveBottomCta('bottom-trial')}
                  onMouseLeave={() => setActiveBottomCta(null)}
                >
                  <InteractiveCtaButton
                    label="免费使用"
                    variant="solid"
                    paddingClassName="px-4 py-3"
                    textClassName="h-[38px] text-[14px] font-medium leading-[14px]"
                    iconFill="#FFFFFF"
                    href={getExternalLinkByName('扣子')}
                    onFocus={() => setActiveBottomCta('bottom-trial')}
                    onBlur={() => setActiveBottomCta(null)}
                  />
                </div>
              </div>
            </div>

            <nav
              aria-label="Bottom Navigation"
              className="grid grid-cols-3 gap-8 font-['Helvetica','Arial',sans-serif] lg:justify-self-end"
            >
              {bottomNavigationGroups.map((group) => (
                <div key={group.label}>
                  <h4 className="text-[20px] font-semibold leading-[20px] text-[#1f2329]">
                    {group.label}
                  </h4>
                  <div
                    className={`mt-6 space-y-2 ${
                      group.label === '产品' ? 'h-[107px]' : ''
                    }`}
                  >
                    {group.items.map((item) => (
                      <a
                        key={item}
                        href={getExternalLinkByName(item)}
                        target="_blank"
                        rel="noreferrer"
                        className={`block text-[14px] leading-[20px] text-[rgba(31,35,41,1)] transition-all hover:text-[#1f2329] hover:underline hover:decoration-current hover:underline-offset-[3px] ${
                          group.label === '产品' && item === '扣子开源' ? 'h-[20px]' : ''
                        }`}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </SectionShell>

        <SectionShell heightClass="h-[80px]">
          <div className="relative isolate h-full">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-screen -translate-x-1/2 bg-[#F0EFE7]"
            />
            <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between">
              <img
                src={cozeLogo}
                alt="扣子"
                className="h-8 w-[78px] shrink-0 object-contain"
              />

              <div className="flex items-center gap-6 whitespace-nowrap font-['PingFang_SC','PingFang SC',sans-serif] text-[12px] font-medium leading-4 text-[#888B96]">
                <span>北京春田知韵科技有限公司 | 营业执照</span>
                <span className="flex items-center gap-[3px]">
                  <img
                    src={footerPoliceRecord}
                    alt=""
                    aria-hidden="true"
                    className="h-[15px] w-[14px] shrink-0 object-contain"
                  />
                  <span>
                    京公网安备11010802044261号
                  </span>
                </span>
                <span>京ICP备2023020373号-4</span>
                <span>@2025 Coze. 版权所有</span>
              </div>
            </div>
          </div>
        </SectionShell>
      </div>
    </main>
  )
}

export default App
