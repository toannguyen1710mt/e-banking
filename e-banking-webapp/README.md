## E-Banking

This is E-Banking web application provides a modern online banking platform, connecting users with banking services in a convenient, safe and flexible way. The platform ensures a seamless and efficient banking experience for managing personal finances and transactions on a daily basis.

## Features scope

- Users can register a new bank account.
- Users can sign in with a created account.
- Users can see the main dashboard (Home tab).
- Quick Action section:
  - Balance: Users can track the current balance and total investments on each account type (Main account, saving account, checking account).
  - Transfer: Users can see a list of transferring methods.
    - Global transfer.
    - To my account transfer.
- Users can edit profiles from the General tab.
- Users can see a list of account settings from the sub-tab:
  - Users can change their Password.
  - Users can set up email Settings.
  - Connected Accounts.
  - Delete Account.
- Users can see the analytics (Analytics tab).
  - Users can add new cards.
- Users can see transaction history (History tab).
  - Users can view a list of transactions from the Transaction History.
  - Users can see Transfer requests from the Action Center
    - Users can see a list of transfer-received transactions and a list of transfer request-received history.
    - Users can see a list of transfer-sent transactions.

## Technical stacks

- [NextJS](https://nextjs.org/) (V15.0.3)
- [ReactJS](https://react.dev/blog/2024/04/25/react-19) (V19.0.0-rc-66855b96-20241106)
- [Zustand](https://github.com/pmndrs/zustand) (V5.0.1)
- [React Hook Form](https://react-hook-form.com/) (V7.53.2)
- [Zod](https://zod.dev/) (V3.23.8)
- [NextUI](https://nextui.org/) (V2.4.8)
- [Strapi](https://strapi.io/)

## Developer tools

- [husky](https://www.npmjs.com/package/husky)
- [prettier](https://storybook.js.org/)
- [eslint](https://eslint.org/)
- [commitlint](https://commitlint.js.org/#/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vercel](https://vercel.com/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/)
- [React test library](https://testing-library.com/docs/react-testing-library/intro/)
- [Axe](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd?pli=1)

# Design on figma:

- Design via [Figma](https://www.figma.com/design/TAZ20nfnc3o6Ua5bPtFgmI/E-Banking?node-id=0-1&node-type=canvas&t=boCAIPjXj360hhmL-0)

# Editor

- Visual Studio Code

# Author

- ngan.do <[ngan.do@asnet.com.vn](ngan.do@asnet.com.vn)>
- hoang.nguyenvan <[hoang.nguyenvan@asnet.com.vn](hoang.nguyenvan@asnet.com.vn)>
- hoa.nguyen <[hoa.nguyen@asnet.com.vn](hoa.nguyen@asnet.com.vn)>
- hoang.tranle <[hoang.tranle@asnet.com.vn](hoang.tranle@asnet.com.vn)>

### Project structure

```shell
.
├── README.md                       # README file
├── .husky                          # Husky configuration
├── .storybook                      # Storybook folder
├── .vscode                         # VSCode configuration
├── public                          # Public assets folder
├── src
│   ├── app                         # Next.js App (App Router)
│   ├── assets                      # Asset folder
│   ├── components                  # React components
│   ├── constants                   # App constants
│   ├── hooks                       # Hooks folder
│   ├── interfaces                  # Interfaces folder
│   ├── mocks                       # Mocks folder
│   ├── services                    # Services folder
│   ├── stories                     # Storybook folder
│   ├── styles                      # Style folder
│   ├── themes                      # Custom themes
│   ├── utils                       # Code Reusability
├── .eslintrc.json                  # ESLint configuration
├── .lintstagedrc                   # Lint-stage
├── .prettierrc                     # Prettier configuration
├── jest.config.ts                  # Jest configuration
├── next.config.mjs                 # Next.js configuration
├── next.config.mjs                 # Next.js configuration
├── postcss.config.mjs              # Post CSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

## How to run

### Prerequisites

Make sure you install packages with correct version below:

- [node v20.10.0](https://nodejs.org/en/)
- [pnpm 7.32.3](https://pnpm.io/)

- **Note:**:
  - Please add `.env` into root of project source code, refer `.env.sample`.
  - Refer: Here's the sample mockAPI project(Will update later), feel free to **clone** then use in your project

### Get source code

| Command                                                       | Action                    |
| :------------------------------------------------------------ | :------------------------ |
| `git clone git@gitlab.asoft-python.com:ngan.do/e-banking.git` | Clone Repository with SSH |
| `$ cd e-banking-webapp`                                       | Redirect to folder        |

### Build and Run app

| Command            | Action                                     | Port                  |
| :----------------- | :----------------------------------------- | :-------------------- |
| `$ pnpm install`   | Install packages dependencies              | N/A                   |
| `$ pnpm build`     | Build app with optimized production mode   | N/A                   |
| `$ pnpm start`     | Starts the application in production mode. | http://localhost:3000 |
| `$ pnpm dev`       | Run the app in development mode            | http://localhost:3000 |
| `$ pnpm storybook` | Run Storybook.                             | http://localhost:6006 |
| `$ pnpm test`      | Run Unit Test                              | N/A                   |
