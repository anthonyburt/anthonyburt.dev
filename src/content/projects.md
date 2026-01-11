<div class="project-list">
  <ul>
    <li id="proj-release-management">
      <strong>Release Management</strong>
      <ul>
        <li><strong>Problem:</strong> Quarterly releases slowed customer delivery and limited safe iteration.</li>
        <li><strong>Approach:</strong> Shifted to monthly release governance using an internal feature flag system across frontend and backend services.</li>
        <li><strong>Outcome:</strong> Moved from quarterly to monthly releases with unchanged escaped defect rates and no regressions.</li>
        <li><strong>Tech:</strong> Internal feature flag system, release governance, frontend/backend services.</li>
      </ul>
    </li>
    <li id="proj-docdb-postgres">
      <strong>DocumentDB to Aurora Postgres Migration Validation</strong>
      <ul>
        <li><strong>Problem:</strong> An internal application (in production ~1 year) was increasingly used like a relational system, creating performance and query limitations in DocumentDB.</li>
        <li><strong>Approach:</strong> Used existing Selenium E2E coverage, unit tests, and a JMeter performance suite to compare DocumentDB vs. Aurora Postgres with real workloads.</li>
        <li><strong>Outcome:</strong> Delivered a two-month migration with clear before/after data and improved application speed.</li>
        <li><strong>Tech:</strong> AWS, Amazon DocumentDB, Aurora Postgres, Selenium, JMeter, unit testing.</li>
      </ul>
    </li>
    <li id="proj-automation-modernization">
      <strong>Automation Modernization</strong>
      <ul>
        <li><strong>Problem:</strong> Legacy automation frameworks made test creation and maintenance slow, especially for UI locators.</li>
        <li><strong>Approach:</strong> Migrated suites from a legacy, internally structured Java framework to a standardized Java toolset to improve maintainability and consistency.</li>
        <li><strong>Outcome:</strong> Migrated 600 UI tests and 1,400 API tests in 3 months, improving maintainability and test creation speed.</li>
        <li><strong>Tech:</strong> Java, Selenium, JUnit, TestNG, AssertJ, RestAssured, Retrofit, DataFaker, ReportPortal, UI/API testing.</li>
      </ul>
    </li>
    <li id="proj-quality-strategy">
      <strong>Quality Strategy Embedded in CI/CD</strong>
      <ul>
        <li><strong>Problem:</strong> Quality checks were inconsistent across teams and hard to scale.</li>
        <li><strong>Approach:</strong> Defined a unified quality strategy, automation coverage targets, and CI/CD gates that every team adopted.</li>
        <li><strong>Outcome:</strong> Reduced escaped defects by ~25% while improving release confidence.</li>
        <li><strong>Tech:</strong> CI/CD pipelines (Jenkins, GitLab pipelines), Selenium, static analysis tooling.</li>
      </ul>
    </li>
    <li id="proj-observability-standards">
      <strong>Observability-Driven Quality Standards</strong>
      <ul>
        <li><strong>Problem:</strong> Teams lacked shared operational signals for reliability and readiness.</li>
        <li><strong>Approach:</strong> Promoted Grafana dashboards, alerting standards, and SLI/SLO thinking across systems.</li>
        <li><strong>Outcome:</strong> Improved visibility into quality trends and accelerated issue detection.</li>
        <li><strong>Tech:</strong> Grafana, monitoring and alerting, SLI/SLO frameworks.</li>
      </ul>
    </li>
    <li id="proj-auth-platform">
      <strong>Authentication Platform Upgrade Validation</strong>
      <ul>
        <li><strong>Problem:</strong> A major auth and session management upgrade risked regression for all users.</li>
        <li><strong>Approach:</strong> Led test strategy, MFA validation, and automated coverage modernization for the upgrade.</li>
        <li><strong>Outcome:</strong> Delivered the migration with improved reliability and faster feedback cycles.</li>
        <li><strong>Tech:</strong> API testing, automation frameworks, pipeline integration tests.</li>
      </ul>
    </li>
  </ul>
</div>
