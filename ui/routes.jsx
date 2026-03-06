import React from 'react';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import { Layout } from './common/components/layout';
import { routes } from './route-paths';

export { routes };

const SignInPage = React.lazy(() => import('./pages/auth/sign-in-page'));
const NotFoundPage = React.lazy(
  () => import('./pages/not-found/not-found-page')
);
const TasksPage = React.lazy(() => import('./pages/tasks/tasks-page'));
const AdminBackupPage = React.lazy(() => import('./pages/admin/admin-backup-page'));
const AdminDashboardPage = React.lazy(() => import('./pages/admin/admin-dashboard-page'));
const AdminIntegrationsPage = React.lazy(() => import('./pages/admin/admin-integrations-page'));
const AdminLogsPage = React.lazy(() => import('./pages/admin/admin-logs-page'));
const AdminSettingsPage = React.lazy(() => import('./pages/admin/admin-settings-page'));
const AdminUsersPage = React.lazy(() => import('./pages/admin/admin-users-page'));
const CalendarViewPage = React.lazy(() => import('./pages/calendar/calendar-view-page'));
const EventCreatePage = React.lazy(() => import('./pages/calendar/event-create-page'));
const EventDetailPage = React.lazy(() => import('./pages/calendar/event-detail-page'));
const EventEditPage = React.lazy(() => import('./pages/calendar/event-edit-page'));
const ActivityPage = React.lazy(() => import('./pages/dashboard/activity-page'));
const AnalyticsPage = React.lazy(() => import('./pages/dashboard/analytics-page'));
const OverviewPage = React.lazy(() => import('./pages/dashboard/overview-page'));
const RecentItemsPage = React.lazy(() => import('./pages/dashboard/recent-items-page'));
const StatsPage = React.lazy(() => import('./pages/dashboard/stats-page'));
const FileBrowserPage = React.lazy(() => import('./pages/files/file-browser-page'));
const FileDetailPage = React.lazy(() => import('./pages/files/file-detail-page'));
const FileSharePage = React.lazy(() => import('./pages/files/file-share-page'));
const FileTrashPage = React.lazy(() => import('./pages/files/file-trash-page'));
const FileUploadPage = React.lazy(() => import('./pages/files/file-upload-page'));
const ContactPage = React.lazy(() => import('./pages/help/contact-page'));
const DocumentationPage = React.lazy(() => import('./pages/help/documentation-page'));
const FaqPage = React.lazy(() => import('./pages/help/faq-page'));
const SupportPage = React.lazy(() => import('./pages/help/support-page'));
const TutorialsPage = React.lazy(() => import('./pages/help/tutorials-page'));
const ComposePage = React.lazy(() => import('./pages/messages/compose-page'));
const DraftsPage = React.lazy(() => import('./pages/messages/drafts-page'));
const InboxPage = React.lazy(() => import('./pages/messages/inbox-page'));
const MessageDetailPage = React.lazy(() => import('./pages/messages/message-detail-page'));
const SentPage = React.lazy(() => import('./pages/messages/sent-page'));
const NotificationCenterPage = React.lazy(() => import('./pages/notifications/notification-center-page'));
const NotificationPreferencesPage = React.lazy(() => import('./pages/notifications/notification-preferences-page'));
const ProjectArchivePage = React.lazy(() => import('./pages/projects/project-archive-page'));
const ProjectCreatePage = React.lazy(() => import('./pages/projects/project-create-page'));
const ProjectDetailPage = React.lazy(() => import('./pages/projects/project-detail-page'));
const ProjectListPage = React.lazy(() => import('./pages/projects/project-list-page'));
const ProjectMembersPage = React.lazy(() => import('./pages/projects/project-members-page'));
const ProjectSettingsPage = React.lazy(() => import('./pages/projects/project-settings-page'));
const CustomReportPage = React.lazy(() => import('./pages/reports/custom-report-page'));
const DailyReportPage = React.lazy(() => import('./pages/reports/daily-report-page'));
const ExportReportPage = React.lazy(() => import('./pages/reports/export-report-page'));
const MonthlyReportPage = React.lazy(() => import('./pages/reports/monthly-report-page'));
const WeeklyReportPage = React.lazy(() => import('./pages/reports/weekly-report-page'));
const AdvancedSearchPage = React.lazy(() => import('./pages/search/advanced-search-page'));
const SavedSearchesPage = React.lazy(() => import('./pages/search/saved-searches-page'));
const SearchResultsPage = React.lazy(() => import('./pages/search/search-results-page'));
const AccountPage = React.lazy(() => import('./pages/settings/account-page'));
const AppearancePage = React.lazy(() => import('./pages/settings/appearance-page'));
const BillingPage = React.lazy(() => import('./pages/settings/billing-page'));
const LanguagePage = React.lazy(() => import('./pages/settings/language-page'));
const NotificationsPage = React.lazy(() => import('./pages/settings/notifications-page'));
const PrivacyPage = React.lazy(() => import('./pages/settings/privacy-page'));
const ProfilePage = React.lazy(() => import('./pages/settings/profile-page'));
const SecurityPage = React.lazy(() => import('./pages/settings/security-page'));
const TagCreatePage = React.lazy(() => import('./pages/tags/tag-create-page'));
const TagDetailPage = React.lazy(() => import('./pages/tags/tag-detail-page'));
const TagListPage = React.lazy(() => import('./pages/tags/tag-list-page'));
const TeamCreatePage = React.lazy(() => import('./pages/teams/team-create-page'));
const TeamDetailPage = React.lazy(() => import('./pages/teams/team-detail-page'));
const TeamListPage = React.lazy(() => import('./pages/teams/team-list-page'));
const TeamMembersPage = React.lazy(() => import('./pages/teams/team-members-page'));
const UserDetailPage = React.lazy(() => import('./pages/users/user-detail-page'));
const UserEditPage = React.lazy(() => import('./pages/users/user-edit-page'));
const UserInvitePage = React.lazy(() => import('./pages/users/user-invite-page'));
const UserListPage = React.lazy(() => import('./pages/users/user-list-page'));
const UserPermissionsPage = React.lazy(() => import('./pages/users/user-permissions-page'));
const UserRolesPage = React.lazy(() => import('./pages/users/user-roles-page'));
const WorkflowCreatePage = React.lazy(() => import('./pages/workflows/workflow-create-page'));
const WorkflowDetailPage = React.lazy(() => import('./pages/workflows/workflow-detail-page'));
const WorkflowHistoryPage = React.lazy(() => import('./pages/workflows/workflow-history-page'));
const WorkflowListPage = React.lazy(() => import('./pages/workflows/workflow-list-page'));

export function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route
          element={
            <Layout loggedOnly={false}>
              <SignInPage />
            </Layout>
          }
          index
        />
        <Route
          element={
            <Layout>
              <TasksPage />
            </Layout>
          }
          path={routes.tasks}
        />
        <Route
          element={
            <Layout>
              <AdminBackupPage />
            </Layout>
          }
          path={routes.adminAdminBackup}
        />
        <Route
          element={
            <Layout>
              <AdminDashboardPage />
            </Layout>
          }
          path={routes.adminAdminDashboard}
        />
        <Route
          element={
            <Layout>
              <AdminIntegrationsPage />
            </Layout>
          }
          path={routes.adminAdminIntegrations}
        />
        <Route
          element={
            <Layout>
              <AdminLogsPage />
            </Layout>
          }
          path={routes.adminAdminLogs}
        />
        <Route
          element={
            <Layout>
              <AdminSettingsPage />
            </Layout>
          }
          path={routes.adminAdminSettings}
        />
        <Route
          element={
            <Layout>
              <AdminUsersPage />
            </Layout>
          }
          path={routes.adminAdminUsers}
        />
        <Route
          element={
            <Layout>
              <CalendarViewPage />
            </Layout>
          }
          path={routes.calendarCalendarView}
        />
        <Route
          element={
            <Layout>
              <EventCreatePage />
            </Layout>
          }
          path={routes.calendarEventCreate}
        />
        <Route
          element={
            <Layout>
              <EventDetailPage />
            </Layout>
          }
          path={routes.calendarEventDetail}
        />
        <Route
          element={
            <Layout>
              <EventEditPage />
            </Layout>
          }
          path={routes.calendarEventEdit}
        />
        <Route
          element={
            <Layout>
              <ActivityPage />
            </Layout>
          }
          path={routes.dashboardActivity}
        />
        <Route
          element={
            <Layout>
              <AnalyticsPage />
            </Layout>
          }
          path={routes.dashboardAnalytics}
        />
        <Route
          element={
            <Layout>
              <OverviewPage />
            </Layout>
          }
          path={routes.dashboardOverview}
        />
        <Route
          element={
            <Layout>
              <RecentItemsPage />
            </Layout>
          }
          path={routes.dashboardRecentItems}
        />
        <Route
          element={
            <Layout>
              <StatsPage />
            </Layout>
          }
          path={routes.dashboardStats}
        />
        <Route
          element={
            <Layout>
              <FileBrowserPage />
            </Layout>
          }
          path={routes.filesFileBrowser}
        />
        <Route
          element={
            <Layout>
              <FileDetailPage />
            </Layout>
          }
          path={routes.filesFileDetail}
        />
        <Route
          element={
            <Layout>
              <FileSharePage />
            </Layout>
          }
          path={routes.filesFileShare}
        />
        <Route
          element={
            <Layout>
              <FileTrashPage />
            </Layout>
          }
          path={routes.filesFileTrash}
        />
        <Route
          element={
            <Layout>
              <FileUploadPage />
            </Layout>
          }
          path={routes.filesFileUpload}
        />
        <Route
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
          path={routes.helpContact}
        />
        <Route
          element={
            <Layout>
              <DocumentationPage />
            </Layout>
          }
          path={routes.helpDocumentation}
        />
        <Route
          element={
            <Layout>
              <FaqPage />
            </Layout>
          }
          path={routes.helpFaq}
        />
        <Route
          element={
            <Layout>
              <SupportPage />
            </Layout>
          }
          path={routes.helpSupport}
        />
        <Route
          element={
            <Layout>
              <TutorialsPage />
            </Layout>
          }
          path={routes.helpTutorials}
        />
        <Route
          element={
            <Layout>
              <ComposePage />
            </Layout>
          }
          path={routes.messagesCompose}
        />
        <Route
          element={
            <Layout>
              <DraftsPage />
            </Layout>
          }
          path={routes.messagesDrafts}
        />
        <Route
          element={
            <Layout>
              <InboxPage />
            </Layout>
          }
          path={routes.messagesInbox}
        />
        <Route
          element={
            <Layout>
              <MessageDetailPage />
            </Layout>
          }
          path={routes.messagesMessageDetail}
        />
        <Route
          element={
            <Layout>
              <SentPage />
            </Layout>
          }
          path={routes.messagesSent}
        />
        <Route
          element={
            <Layout>
              <NotificationCenterPage />
            </Layout>
          }
          path={routes.notificationsNotificationCenter}
        />
        <Route
          element={
            <Layout>
              <NotificationPreferencesPage />
            </Layout>
          }
          path={routes.notificationsNotificationPreferences}
        />
        <Route
          element={
            <Layout>
              <ProjectArchivePage />
            </Layout>
          }
          path={routes.projectsProjectArchive}
        />
        <Route
          element={
            <Layout>
              <ProjectCreatePage />
            </Layout>
          }
          path={routes.projectsProjectCreate}
        />
        <Route
          element={
            <Layout>
              <ProjectDetailPage />
            </Layout>
          }
          path={routes.projectsProjectDetail}
        />
        <Route
          element={
            <Layout>
              <ProjectListPage />
            </Layout>
          }
          path={routes.projectsProjectList}
        />
        <Route
          element={
            <Layout>
              <ProjectMembersPage />
            </Layout>
          }
          path={routes.projectsProjectMembers}
        />
        <Route
          element={
            <Layout>
              <ProjectSettingsPage />
            </Layout>
          }
          path={routes.projectsProjectSettings}
        />
        <Route
          element={
            <Layout>
              <CustomReportPage />
            </Layout>
          }
          path={routes.reportsCustomReport}
        />
        <Route
          element={
            <Layout>
              <DailyReportPage />
            </Layout>
          }
          path={routes.reportsDailyReport}
        />
        <Route
          element={
            <Layout>
              <ExportReportPage />
            </Layout>
          }
          path={routes.reportsExportReport}
        />
        <Route
          element={
            <Layout>
              <MonthlyReportPage />
            </Layout>
          }
          path={routes.reportsMonthlyReport}
        />
        <Route
          element={
            <Layout>
              <WeeklyReportPage />
            </Layout>
          }
          path={routes.reportsWeeklyReport}
        />
        <Route
          element={
            <Layout>
              <AdvancedSearchPage />
            </Layout>
          }
          path={routes.searchAdvancedSearch}
        />
        <Route
          element={
            <Layout>
              <SavedSearchesPage />
            </Layout>
          }
          path={routes.searchSavedSearches}
        />
        <Route
          element={
            <Layout>
              <SearchResultsPage />
            </Layout>
          }
          path={routes.searchSearchResults}
        />
        <Route
          element={
            <Layout>
              <AccountPage />
            </Layout>
          }
          path={routes.settingsAccount}
        />
        <Route
          element={
            <Layout>
              <AppearancePage />
            </Layout>
          }
          path={routes.settingsAppearance}
        />
        <Route
          element={
            <Layout>
              <BillingPage />
            </Layout>
          }
          path={routes.settingsBilling}
        />
        <Route
          element={
            <Layout>
              <LanguagePage />
            </Layout>
          }
          path={routes.settingsLanguage}
        />
        <Route
          element={
            <Layout>
              <NotificationsPage />
            </Layout>
          }
          path={routes.settingsNotifications}
        />
        <Route
          element={
            <Layout>
              <PrivacyPage />
            </Layout>
          }
          path={routes.settingsPrivacy}
        />
        <Route
          element={
            <Layout>
              <ProfilePage />
            </Layout>
          }
          path={routes.settingsProfile}
        />
        <Route
          element={
            <Layout>
              <SecurityPage />
            </Layout>
          }
          path={routes.settingsSecurity}
        />
        <Route
          element={
            <Layout>
              <TagCreatePage />
            </Layout>
          }
          path={routes.tagsTagCreate}
        />
        <Route
          element={
            <Layout>
              <TagDetailPage />
            </Layout>
          }
          path={routes.tagsTagDetail}
        />
        <Route
          element={
            <Layout>
              <TagListPage />
            </Layout>
          }
          path={routes.tagsTagList}
        />
        <Route
          element={
            <Layout>
              <TeamCreatePage />
            </Layout>
          }
          path={routes.teamsTeamCreate}
        />
        <Route
          element={
            <Layout>
              <TeamDetailPage />
            </Layout>
          }
          path={routes.teamsTeamDetail}
        />
        <Route
          element={
            <Layout>
              <TeamListPage />
            </Layout>
          }
          path={routes.teamsTeamList}
        />
        <Route
          element={
            <Layout>
              <TeamMembersPage />
            </Layout>
          }
          path={routes.teamsTeamMembers}
        />
        <Route
          element={
            <Layout>
              <UserDetailPage />
            </Layout>
          }
          path={routes.usersUserDetail}
        />
        <Route
          element={
            <Layout>
              <UserEditPage />
            </Layout>
          }
          path={routes.usersUserEdit}
        />
        <Route
          element={
            <Layout>
              <UserInvitePage />
            </Layout>
          }
          path={routes.usersUserInvite}
        />
        <Route
          element={
            <Layout>
              <UserListPage />
            </Layout>
          }
          path={routes.usersUserList}
        />
        <Route
          element={
            <Layout>
              <UserPermissionsPage />
            </Layout>
          }
          path={routes.usersUserPermissions}
        />
        <Route
          element={
            <Layout>
              <UserRolesPage />
            </Layout>
          }
          path={routes.usersUserRoles}
        />
        <Route
          element={
            <Layout>
              <WorkflowCreatePage />
            </Layout>
          }
          path={routes.workflowsWorkflowCreate}
        />
        <Route
          element={
            <Layout>
              <WorkflowDetailPage />
            </Layout>
          }
          path={routes.workflowsWorkflowDetail}
        />
        <Route
          element={
            <Layout>
              <WorkflowHistoryPage />
            </Layout>
          }
          path={routes.workflowsWorkflowHistory}
        />
        <Route
          element={
            <Layout>
              <WorkflowListPage />
            </Layout>
          }
          path={routes.workflowsWorkflowList}
        />
        <Route
          element={
            <Layout loggedOnly={false}>
              <NotFoundPage />
            </Layout>
          }
          path={routes.notFound}
        />
      </ReactRoutes>
    </BrowserRouter>
  );
}
