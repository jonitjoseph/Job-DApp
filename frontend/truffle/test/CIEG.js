const CIEG = artifacts.require("CIEG");

contract("CIEG", async (accounts) => {
  it("Verified Employer", async () => {
    cieg = await CIEG.deployed();
    employerAddress = accounts[1];
    employerName = "A";
    empVId = 0;
    try {
      await cieg.addVerifiedEmployer(employerAddress, employerName);
      verifiedEmployerDetails = await cieg.getVerifiedEmployer(empVId);
      console.log("verifiedEmployerDetails", verifiedEmployerDetails);
      assert.equal(verifiedEmployerDetails[0], empVId, "Test Fail");
      assert.equal(verifiedEmployerDetails[1], employerAddress, "Test Fail");
      assert.equal(verifiedEmployerDetails[2], employerName, "Test Fail");
    } catch (err) {
      assert(err);
      console.log(err);
    }
  });
  it("Performance Matrix", async () => {
    cieg = await CIEG.deployed();
    employerAddressPM = accounts[1];
    candidateAddressPM = accounts[2];
    enrolledJobId = 0;
    evalScore = 4;
    try {
      await cieg.addPerfMatrix(
        employerAddressPM,
        candidateAddressPM,
        enrolledJobId,
        evalScore
      );
      perfMatrix = await cieg.getPerfMatrix(enrolledJobId);
      console.log("perfMatrix", perfMatrix);
      assert.equal(perfMatrix[0], employerAddressPM, "Test Fail");
      assert.equal(perfMatrix[1], candidateAddressPM, "Test Fail");
      assert.equal(perfMatrix[2], enrolledJobId, "Test Fail");
      assert.equal(perfMatrix[3], evalScore, "Test Fail");
    } catch (err) {
      assert(err);
      console.log(err);
    }
  });
  it("Candidate", async () => {
    cieg = await CIEG.deployed();
    appliedJobId = 0;
    name = "ABCD";
    age = 20;
    phone = "98765";
    qual = "xyz";
    candidateAddressCD = accounts[3];
    try {
      await cieg.addCandidate(appliedJobId, name, age, phone, qual, {
        from: candidateAddressCD,
      });
      candidateDetails = await cieg.getCandidate(appliedJobId);
      console.log("candidateDetails", candidateDetails);
      assert.equal(candidateDetails[0], appliedJobId, "Test Fail");
      assert.equal(candidateDetails[1], age, "Test Fail");
      assert.equal(candidateDetails[2], name, "Test Fail");
      assert.equal(candidateDetails[3], phone, "Test Fail");
      assert.equal(candidateDetails[4], qual, "Test Fail");
    } catch (err) {
      assert(err);
      console.log(err);
    }
  });
  it("Job", async () => {
    cieg = await CIEG.deployed();
    evid = 0;
    companyName = "ABCDEF";
    jobTitle = "GHIJKL";
    location = "MNOPQR";
    jobType = "STUVWX";
    reward = 2;
    employerAddress = accounts[1];
    jobId = 1;
    try {
      await cieg.addJob(
        evid,
        companyName,
        jobTitle,
        location,
        jobType,
        reward,
        { from: employerAddress }
      );
      jobDetails = await cieg.getJob(jobId);
      console.log("jobDetails", jobDetails);
      assert.equal(jobDetails[0], employerAddress, "Test Fail");
      assert.equal(jobDetails[1], jobId, "Test Fail");
      assert.equal(jobDetails[2], companyName, "Test Fail");
      assert.equal(jobDetails[3], jobTitle, "Test Fail");
      assert.equal(jobDetails[4], location, "Test Fail");
      assert.equal(jobDetails[5], jobType, "Test Fail");
      assert.equal(jobDetails[5], reward, "Test Fail");
    } catch (err) {
      assert(err);
      console.log(err);
    }
  });
});
