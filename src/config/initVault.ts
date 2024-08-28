import NodeVault = require("hashi-vault-js");

interface Secrets {
  jwt_seed: string;
  context: string;
}

const vault = new NodeVault({
  baseUrl: `http://${process.env.VAULT_HOST}:${process.env.VAULT_PORT}/v1`,
  timeout: 5000,
  proxy: false,
});

const initVault = async (): Promise<void> => {
  try {
    console.info("=============Connecting Vault=============");
    const { client_token, policies, metadata, entity_id } =
      await vault.loginWithAppRole(
        process.env.ROLE_ID ?? "",
        process.env.SECRET_ID ?? ""
      );
    console.table({
      policies: policies.join(" "),
      role_name: metadata.role_name,
      entity_id,
    });
    const commonResp = await vault.readKVSecret(
      client_token,
      "common",
      undefined,
      process.env.PRODUCTION ? "prd" : "dev"
    );
    console.info("=============Connected Vault=============");
    Object.keys(commonResp.data).forEach((key) => {
      process.env[key] = commonResp.data[key];
    });
  } catch (err: any) {
    if (err.isVaultError) {
      console.log(err);
      return err;
    } else {
      throw err;
    }
  }
};

export { initVault };
